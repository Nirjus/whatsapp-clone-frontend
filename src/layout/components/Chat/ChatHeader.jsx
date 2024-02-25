import { useState } from "react";
import Avatars from "../Avatar";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ContextMenue from "../ContextMenue";
import { ExternalLink } from "lucide-react";

const ChatHeader = () => {
  const {currentChatUser, onlineUsers} = useSelector((state) => state.initUser);
  const dispatch = useDispatch();
  const [isContextMenueVisible, setIsContextMenueVisible] = useState(false);
  const [contextMenueCordinates, setContextMenueCordinates] = useState({
    x: 0,
    y: 0,
  });

  const showContextMenue = (e) => {
    e.preventDefault();
    setContextMenueCordinates({ x: e.pageX - 100, y: e.pageY });
    setIsContextMenueVisible(true);
  };

  const handleMessageSearch = () => {
    dispatch({
      type: "SET_MESSAGE_SEARCH",
    })
  }

  const handleVoiceCall = () => {
    dispatch({
      type: "SET_VOICE_CALL",
      voiceCall: {
        ...currentChatUser,
        type: "out-going",
        callType: "voice",
        roomId: Date.now(),
      }
    })
  }
  const handleVideoCall = () => {
    dispatch({
      type: "SET_VIDEO_CALL",
      videoCall: {
        ...currentChatUser,
        type: "out-going",
        callType: "video",
        roomId: Date.now(),
      }
    })
  }

  const contextMenueOptions = [
    {
      name: (<div className=" flex items-center gap-3">Exit <ExternalLink color="#f76a74" size={21} /></div>),
      callBack: () => {
        dispatch({
          type: "currentChatUser",
          payload:{
              id:"",
              name: "",
              email: "",
              avatar: "",
              about: ""
          }
      })
      dispatch({
        type: "LOAD_MESSAGES",
        messages: []
      })
      },
    }
  ]
  
  return (
    <div className=" border-l border-l-[#8989893f] h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background z-10">
      <div className="flex items-center justify-between gap-6">
        <Avatars size={"sm"} image={currentChatUser?.avatar} />
        <div className="flex flex-col">
          <span className=" text-primary-strong">{currentChatUser?.name}</span>
          <span className=" text-secondary text-sm"> 
          {
            onlineUsers.includes(currentChatUser.id) ? "online" : "offline"
          }
           </span>
        </div>
      </div>
      <div className="flex gap-6">
        <MdCall className=" cursor-pointer text-xl" onClick={handleVoiceCall} />
        <IoVideocam className=" cursor-pointer text-xl" onClick={handleVideoCall} />
        <BiSearchAlt2 className=" cursor-pointer text-xl" onClick={handleMessageSearch} />
        <BsThreeDotsVertical className=" cursor-pointer text-xl " id="context-opener" onClick={(e) => showContextMenue(e)} />
        {
          isContextMenueVisible && <ContextMenue options={contextMenueOptions}
                                                   cordinates={contextMenueCordinates}
                                                   contextMenue={isContextMenueVisible}
                                                   setContextMenue={setIsContextMenueVisible}
          />
        }
      </div>
    </div>
  );
};

export default ChatHeader;
