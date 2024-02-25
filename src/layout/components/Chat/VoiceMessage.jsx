import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaStop } from "react-icons/fa";
import MessageStatus from "../Common/MessageStatus";
import { AudioTimeFormat, TimeFormat } from "../../../utils/TimeFormat";
import { HOST } from "../../../utils/ApiRoutes";
import Avatars from "../Avatar";


const VoiceMessage = ({ message, user, currentChatUser }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuartion] = useState(0);
  
  const waveformRef = useRef(null);
  const waveform = useRef(null);

  useEffect(() => {
    if (waveform.current === null) {
      waveform.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#ccc",
        progressColor: "#7ae3c3",
        barWidth: 2,
        height: 30,
        normalize:true,
      });
    }
    
    waveform.current.on("finish", () => {
      setIsPlaying(false);
    });
  
    return () => {
      waveform.current.destroy();
    };
  }, []);

  useEffect(() => {
    const audioUrl = `${HOST}/${message.message}`;
    
    waveform.current.load(audioUrl);
    waveform.current.on("ready", () => {
      setTotalDuartion(waveform.current.getDuration());
    });
    waveform.current.on("audioprocess", () => {
      setCurrentPlaybackTime(waveform.current.getCurrentTime());
    });

    return () => {
      waveform.current.unAll(); // Remove all event listeners when component unmounts
    };
  }, [message]);


  const handlePlayAudio = () => {
    if (waveform.current){
      waveform.current.play();      
      setIsPlaying(true);
  }
  };
  const handlePauseAudio = () => {
    waveform.current.pause();
    setIsPlaying(false);
  };
  return (
    <div
      className={` text-white px-3 pt-2 pb-1 text-sm rounded-md flex items-center w-fit gap-5 ${
        message.senderId === currentChatUser?.id
          ? "bg-incoming-background"
          : "bg-outgoing-background"
      }`}
    > 
      <div>
        <Avatars size={"lg"} image={ message.senderId === currentChatUser?.id ? currentChatUser?.avatar : user?.avatar} />
      </div>
      <div className="cursor-pointer text-xl">
        {!isPlaying ? (
          <FaPlay onClick={handlePlayAudio} />
        ) : (
          <FaStop onClick={handlePauseAudio} />
        )}
      </div>
      <div className="relative">
        <p className=" pb-1 font-mono text-[#ffffffd0]">{message.message.slice(32, message.message.length)}</p>
        <div className=" 800px:w-60 w-[200px] bg-[#0000002b] rounded-md p-2 " ref={waveformRef}> </div>
          <div className=" text-bubble-meta text-[11px] pt-1 flex justify-between   w-full">
            <span>
              {AudioTimeFormat(isPlaying ? currentPlaybackTime : totalDuration)}
            </span>
            <div className="flex gap-1 items-end">
              <span className=" text-bubble-meta text-[10px] whitespace-nowrap ">
                {TimeFormat(message.createdAt)}
              </span>
              <span>
                {message.senderId === user?.id && (
                  <MessageStatus messageStatus={message?.messageStatus} />
                )}
              </span>
            </div>
          </div>
      </div>
    </div>
  );
};

export default VoiceMessage;
