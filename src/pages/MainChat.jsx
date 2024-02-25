import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useMemo } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import Chatlist from "../layout/components/Chatlist.jsx";
import Empty from "../layout/components/Empty.jsx";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/FirebaseConfig.js";
import {
  CHECK_USER_ROUTE,
  GET_MESSAGES_ROUTE,
  HOST,
} from "../utils/ApiRoutes.js";
import Chat from "../layout/components/Chat/Chat.jsx";
import CustomizedAccordions from "../layout/components/Chat/MediaAccordion.jsx";
import VideoCall from "../layout/components/call/VideoCall.jsx";
import VoiceCall from "../layout/components/call/VoiceCall.jsx";
import IncomingVideoCall from "../layout/components/Common/IncomingVideoCall.jsx";
import IncomingVoiceCall from "../layout/components/Common/IncomingVoiceCall.jsx";

const MainChat = () => {
  const socket = useMemo(() => io(HOST), []);
  const { currentChatUser, isAuthenticated, user } = useSelector(
    (state) => state.initUser
  );
  const {messagesSearch, videoCall, voiceCall, incommingVoiceCall, incommingVideoCall} = useSelector((state) => state.initMessage);
   
  const navigate = useNavigate();
  const dispatch = useDispatch();

  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if (!currentUser) {
      navigate("/login");
    }
    if (!isAuthenticated && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: currentUser.email,
      });
      if (!data.status) {
        navigate("/login");
      }
      dispatch({
        type: "loadUserSuccess",
        payload: {
          id: data?.useR.id,
          name: data?.useR.name,
          email: data?.useR.email,
          avatar: data?.useR.avatar,
          about: data?.useR.about,
        },
      });
    }
  });

  useEffect(() => {
    if (user) {
      socket.emit("add-user", user.id);
      dispatch({
        type: "SET_SOCKET",
        socket,
      });
    }
  }, [user, socket, dispatch]);

  useEffect(() => {
    socket.on("msg-recieve", (data) => {
      dispatch({
        type: "ADD_MESSAGES",
        newMessage: data.message,
      });
    });
    socket.on("incoming-voice-call",({
      from,
      roomId,
      callType 
    }) => {
      dispatch({
        type: "SET_INCOMING_VOICE_CALL",
        incommingVoiceCall:{...from, roomId, callType}
      })
    })

    socket.on("incoming-video-call",({
      from,
      roomId,
      callType 
    }) => {
      dispatch({
        type: "SET_INCOMING_VIDEO_CALL",
        incommingVideoCall:{...from, roomId, callType}
      })
    })

    socket.on("voice-call-rejected", () => {
      dispatch({
        type:"END_CALL"
      })
    })
    socket.on("video-call-rejected", () => {
      dispatch({
        type:"END_CALL"
      })
    })
     
    socket.on("online-users", ({onlineUsers}) => {
      dispatch({
        type: "SET_ONLINE_USERS",
        onlineUsers,
      })
    })
    

  }, [socket, dispatch]);

  useEffect(() => {
    const getMessage = async () => {
      const {
        data: { messages },
      } = await axios.get(
        `${GET_MESSAGES_ROUTE}/${user.id}/${currentChatUser.id}`
      );

      dispatch({
        type: "LOAD_MESSAGES",
        messages,
      });
    };
    if (currentChatUser?.id) {
      getMessage();
    }
  }, [currentChatUser, user, dispatch]);

  return (
    <>
    {
      incommingVideoCall && <IncomingVideoCall />
    }
    {
      incommingVoiceCall && <IncomingVoiceCall />
    }
    {
      videoCall && !voiceCall && ( <div className=" h-screen w-full overflow-hidden">
        <VideoCall />
      </div>)
    }
    {
      voiceCall && !videoCall && ( <div className=" h-screen w-full overflow-hidden">
        <VoiceCall />
      </div>)
    }
    {
      !videoCall && !voiceCall && (
        <div className=" grid grid-cols-main h-screen w-full max-h-screen overflow-hidden">
        <Chatlist />
        {currentChatUser.id ? (
          <div className={messagesSearch ? "grid grid-cols-2 " : " "}>
            <Chat />
            {
              messagesSearch && <CustomizedAccordions />
            }
          </div>
        ) : <Empty />}
      </div>
      )
    }
    </>
  );
};

export default MainChat;
