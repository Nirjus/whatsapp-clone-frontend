import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import {
  FaMicrophone,
  FaPauseCircle,
  FaPlay,
  FaStop,
  FaTrash,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { AudioTimeFormat } from "../../../utils/TimeFormat";
import { MdSend } from "react-icons/md";
import { IconButton } from "@mui/material";
import axios from "axios";
import { ADD_AUDIO_MESSAGE } from "../../../utils/ApiRoutes";
import toast from "react-hot-toast";
const CaptureAudio = ({ onChange }) => {
  const dispatch = useDispatch();
  const { user, currentChatUser } = useSelector((state) => state.initUser);
  const { socket } = useSelector((state) => state.initMessage);
 
  const [isRecording, setIsRecording] = React.useState(false);
  const [waveform, setWaveform] = React.useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuartion] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [renderdAudio, setRenderedAudio] = useState(null);

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const waveformRef = useRef(null);

  useEffect(() => {
    let interval;
    if(isRecording){
      interval = setInterval(() => {
        setRecordingDuration((prevDuration) => {
          setTotalDuartion(prevDuration + 1);
          return prevDuration + 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRecording]);

  useEffect(() => {
    const waveSerfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ccc",
      progressColor: "#7ae3c3",
      barWidth: 2,
      height: 30,
      normalize:true,
    });
    setWaveform(waveSerfer);
    
    waveSerfer.on("finish", () => {
      setIsPlaying(false);
    });
    waveSerfer.on("audioprocess", () => {
      setCurrentPlaybackTime(waveSerfer.getCurrentTime())
    })
    return () => {
      waveSerfer.destroy();
    };
  }, []);

  useEffect(() => {
    if(waveform){
      handleStartRecording();
    }
  }, [waveform]);

  const handleStartRecording = () => {
    setRecordingDuration(0);
    setCurrentPlaybackTime(0);
    setTotalDuartion(0);
    setIsRecording(true);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioRef.current.srcObject = stream;

        const chunks = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          const audioURL = URL.createObjectURL(blob);
          waveform.load(audioURL);
        };
        mediaRecorder.start();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handlePlayRecording = () => {
     if(waveform){
        waveform.play();
        setIsPlaying(true)
     }
  };
  const handlePauseRecording = () => {
    waveform.pause();
    setIsPlaying(false);
  };
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        waveform.stop();
        const audioChunks = [];
        mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
        });
        mediaRecorderRef.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const audioFile = new File([audioBlob], "recording.mp3");
        setRenderedAudio(audioFile);
        });
        }
  };
  const handleSendRecording = async () => {
     const formData = new FormData();
     formData.append("audio",renderdAudio);
    await axios.post(ADD_AUDIO_MESSAGE, formData, {
      headers:{
        "Content-Type": "multipart/form-data",
      },
      params:{
        from: user.id,
        to: currentChatUser.id
      }
    }).then((res) => {

      socket.emit("send-msg", {
        to: currentChatUser?.id,
        from: user?.id,
        message: res.data.message,
      });
      dispatch({
        type: "ADD_MESSAGES",
        newMessage: res.data.message,
        fromSelf: true,
      });
      onChange(false);
    }).catch((error) => {
      toast.error(error.response.data.message)
    })

  };

  return (
    <div className=" flex text-2xl w-full justify-end items-center">
      <div className="pt-1">
        <IconButton color="inherit">
          <FaTrash
            size={20}
            className=" cursor-pointer"
            title="Delete"
            onClick={() => onChange(false)}
          />
        </IconButton>
      </div>
      <div className="mx-4 800px:w-[80%] w-full py-2 px-4 text-white text-lg flex gap-3 justify-center items-center bg-search-input-container-background rounded-full drop-shadow-lg">
        {isRecording ? (
          <div className=" text-red-500 animate-pulse w-full text-center">
            Recording <span>{recordingDuration}s</span>
          </div>
        ) : (
          <div>
            {waveform && (
              <>
                {!isPlaying ? (
                  <FaPlay title="Play" className=" cursor-pointer " onClick={handlePlayRecording} />
                ) : (
                  <FaStop title="Pause" className=" cursor-pointer" onClick={handlePauseRecording} />
                )}
              </>
            )}
          </div>
        )}
        <div className="w-full" ref={waveformRef} hidden={isRecording}></div>
        {waveform && isPlaying && (
          <span>{AudioTimeFormat(currentPlaybackTime)}</span>
        )}
        {waveform && !isPlaying && (
          <span>{AudioTimeFormat(totalDuration)}</span>
        )}
        <audio ref={audioRef} hidden></audio>
        </div>
        <div className="mr-4">
          {!isRecording ? (
            <FaMicrophone
              className=" text-red-500 cursor-pointer animate-bounce"
              title="Recorder"
              onClick={handleStartRecording}
            />
          ) : (
            <FaPauseCircle
              className=" text-red-500 cursor-pointer"
              title="Stop"
              onClick={handleStopRecording}
            />
          )}
        </div>
        <div className="">
         {
          !isRecording &&  <MdSend
          className=" cursor-pointer mr-4"
          onClick={handleSendRecording}
        />
         }
        </div>
    </div>
  );
};

export default CaptureAudio;
