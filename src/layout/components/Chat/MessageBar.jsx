import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";
import { BiMicrophone } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { ADD_IMAGE_MESSAGE, ADD_MESSAGE_ROUTE } from "../../../utils/ApiRoutes";
import ContextMenue from "../ContextMenue";
import CaptureAudio from "../Common/CaptureAudio.jsx";
import BasicModal from "../Modal";
import { FileAudio, ImagePlus, Video } from "lucide-react";
import MediaControlCard from "../MusicModal.jsx";
import VideoModal from "../VideoModal.jsx";
const MessageBar = () => {
  const { user, currentChatUser } = useSelector((state) => state.initUser);
  const { socket } = useSelector((state) => state.initMessage);
  const [message, setMessage] = React.useState("");
  const [image, setImage] = React.useState("");
  const [files, setFiles] = useState("");
  const [audioFiles, setAudioFiles] = useState("");
  const [audio, setAudio] = React.useState("");
  const [video, setVideo] = React.useState("");
  const [showVideo, setShowVideo] = React.useState("");
  const [videoPopup, setVideoPopup] = React.useState(false);
  const [showEmojiPicKer, setShowEmojiPicker] = React.useState(false);
  const [isContextMenueVisible, setIsContextMenueVisible] = useState(false);
  const [sendImagePopup, setSendImagePopup] = useState(false);
  const [sendAudioPopup, setSendAudioPopup] = useState(false);
  const [showAudioRecorder, setShowAudioRecoder] = useState(false);
  const [contextMenueCordinates, setContextMenueCordinates] = useState({
    x: 0,
    y: 0,
  });
  const showContextMenue = (e) => {
    e.preventDefault();
    setContextMenueCordinates({ x: e.pageX + 20, y: e.pageY - 140 });
    setIsContextMenueVisible(true);
  };
  const emojiPickerRef = useRef(null);

  const dispatch = useDispatch();

  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== "emoji-open") {
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(event.target)
        ) {
          setShowEmojiPicker(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleEmojiModel = () => {
    setShowEmojiPicker(!showEmojiPicKer);
  };
  const handleImojiClick = (emoji) => {
    setMessage((prevMessage) => (prevMessage += emoji.emoji));
  };

  const photoPickerChange = () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.addEventListener("change", (e) => {
      const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        setFiles(file);
        setSendImagePopup(true);
    });
    inputFile.click();
  };
  const contextMenueOptions = [
    {
      name: (
        <div className=" flex gap-1 items-center">
          Send Image <ImagePlus size={20} color="#a6efd3" />{" "}
        </div>
      ),
      callBack: () => {
        photoPickerChange();
      },
    },
    {
      name: (
        <div className=" flex gap-2 items-center">
          Send Audio <FileAudio size={20} color="#fbc1df" />{" "}
        </div>
      ),
      callBack: () => {
        handleSendAudio();
      },
    },
    {
      name: (
        <div className=" flex gap-2 items-center">
          Send Video <Video size={20} color="#b8b7f9" />{" "}
        </div>
      ),
      callBack: () => {
      handleSendVideo()
      },
    },
  ];

  const sendMessage = async () => {
    if (message !== "") {
      try {
        const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
          message,
          from: user?.id,
          to: currentChatUser?.id,
        });
        socket.emit("send-msg", {
          to: currentChatUser?.id,
          from: user?.id,
          message: data.newMessage,
        });
        dispatch({
          type: "ADD_MESSAGES",
          newMessage: data.newMessage,
          fromSelf: true,
        });
        setMessage("");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Type a message");
    }
  };
  const sendImageHandler = async () => {
      try {

        const formData = new FormData();
        formData.append("image", files)
        
        const { data } = await axios.post(ADD_IMAGE_MESSAGE, formData,{
          headers:{
            "Content-Type": "multipart/form-data",
          },
          params:{
            from: user?.id,
            to: currentChatUser?.id
          }
        });

        socket.emit("send-msg", {
          to: currentChatUser?.id,
          from: user?.id,
          message: data.message,
        });
        dispatch({
          type: "ADD_MESSAGES",
          newMessage: data.message,
          fromSelf: true,
        });
        setImage("");
        setSendImagePopup(false);
      } catch (error) {
        console.log(error);
      }
  };

  const handleSendAudio = () => {
    const inputAudio = document.createElement("input");
    inputAudio.type = "file";
    inputAudio.accept = "audio/*";
    inputAudio.addEventListener("change", (e) => {
      const file = e.target.files[0];
      const audioUrl = URL.createObjectURL(file);
      setAudio(audioUrl);
      setAudioFiles(file)
      setSendAudioPopup(true);
    });
    inputAudio.click();
  };

 const handleSendVideo = () => {
  const inputAudio = document.createElement("input");
  inputAudio.type = "file";
  inputAudio.accept = "video/*";
  inputAudio.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const videoUrl = URL.createObjectURL(file);
    setShowVideo(videoUrl);
    setVideo(file)
    setVideoPopup(true);
  });
  inputAudio.click();
 }

  return (
    <div className=" bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
      {!showAudioRecorder && (
        <>
          <div className=" flex gap-6">
            <BsEmojiSmile
              className=" cursor-pointer text-xl "
              title="Emoji"
              id="emoji-open"
              onClick={handleEmojiModel}
            />
            {showEmojiPicKer && (
              <div
                ref={emojiPickerRef}
                className=" absolute bottom-24 left-16 z-40"
              >
                <EmojiPicker
                  onEmojiClick={handleImojiClick}
                  open={showEmojiPicKer}
                  theme="dark"
                />
              </div>
            )}
            <ImAttachment
              className=" cursor-pointer text-xl "
              title="Attach File"
              id="context-opener"
              onClick={(e) => showContextMenue(e)}
            />
            {isContextMenueVisible && (
              <ContextMenue
                options={contextMenueOptions}
                cordinates={contextMenueCordinates}
                contextMenue={isContextMenueVisible}
                setContextMenue={setIsContextMenueVisible}
              />
            )}
          </div>
          <div className=" w-full rounded-lg h-10 flex items-center">
            <input
              type="text"
              placeholder=" Type a message.."
              className=" bg-input-background text-sm outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className=" flex w-10 items-center justify-center gap-5 mx-3 ">
            <button onClick={sendMessage}>
              <MdSend size={22} title="send Message" />
            </button>
            <button
              className=" rounded-full bg-[#22be92] p-2"
              onClick={() => setShowAudioRecoder(true)}
            >
              <BiMicrophone size={20} title="send Message" />
            </button>
          </div>
        </>
      )}
      {sendImagePopup && (
        <BasicModal
          imgSrc={image}
          imageFile={files}
          popupOff={sendImagePopup}
          setPopupOff={setSendImagePopup}
          sendImageHandler={sendImageHandler}
        />
      )}
      {sendAudioPopup && (
        <MediaControlCard
          audio={audio}
          audioFile={audioFiles}
          audioPopup={sendAudioPopup}
          setAudioPopup={setSendAudioPopup}
        />
      )}
      {
       setVideoPopup && (
         <VideoModal videoSrc={showVideo} video={video} popupOff={videoPopup} setPopupOff={setVideoPopup} />
       )
      }
      {showAudioRecorder && <CaptureAudio onChange={setShowAudioRecoder} />}
    </div>
  );
};

export default MessageBar;
