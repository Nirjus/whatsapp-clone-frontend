import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { TimeFormat } from "../../../utils/TimeFormat";
import MessageStatus from "../Common/MessageStatus";
import VoiceMessage from "./VoiceMessage";
import VideoMessage from "./VideoMessage";
import { ArrowDown } from "lucide-react";
import { HOST } from "../../../utils/ApiRoutes";

const ChatContainer = () => {
  const { messages } = useSelector((state) => state.initMessage);
  const { user, currentChatUser } = useSelector((state) => state.initUser);
  const scrollRef = useRef(null);

  const scrollDownHandler = () => {
    scrollRef.current.scrollIntoView();
  };
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className=" h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar">
      <div className=" bg-chat-background bg-fixed h-full w-full opacity-25 fixed left-0 top-0 z-0"></div>
      <div className="mx-10 my-6 relative bottom-0 z-40 left-0">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
            {messages &&
              messages.map((message, index) => {
                return (
                  <div
                    key={index}
                    className={` flex ${
                      message.senderId === currentChatUser?.id
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    {message.type === "text" && (
                      <div
                        className={` text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[60%] w-auto ${
                          message.senderId === currentChatUser?.id
                            ? "bg-incoming-background"
                            : "bg-outgoing-background"
                        }`}
                      >
                        <span className=" break-words pt-1 pr-1">
                          {message.message}
                        </span>
                        <div className="flex gap-1 items-end">
                          <span className=" text-bubble-meta text-[10px] whitespace-nowrap ">
                            {TimeFormat(message.createdAt)}
                          </span>
                          <span>
                            {message.senderId === user?.id && (
                              <MessageStatus
                                messageStatus={message?.messageStatus}
                              />
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                    {message.type === "image" && (
                      <div
                        className={` text-white px-2 py-[5px] text-sm rounded-md flex flex-col gap-2 items-end max-w-[400px] w-[60%] ${
                          message.senderId === currentChatUser?.id
                            ? "bg-incoming-background"
                            : "bg-outgoing-background"
                        }`}
                      >
                        <img
                          src={`${HOST}/${message.message}`}
                          alt=""
                          className=" w-full object-contain rounded-lg"
                        />
                        <div className="flex gap-1 items-end">
                          <span className=" text-bubble-meta text-[10px] whitespace-nowrap ">
                            {TimeFormat(message.createdAt)}
                          </span>
                          <span>
                            {message.senderId === user?.id && (
                              <MessageStatus
                                messageStatus={message?.messageStatus}
                              />
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                    {message.type === "video" && (
                      <VideoMessage
                        message={message}
                        user={user}
                        currentChatUser={currentChatUser}
                      />
                    )}
                    {message.type === "audio" && (
                      <VoiceMessage
                        message={message}
                        user={user}
                        currentChatUser={currentChatUser}
                      />
                    )}
                  </div>
                );
              })}
            <div ref={scrollRef}></div>
          </div>
          <div
            className=" p-2 bg-[#6c6b6b4e] rounded-md fixed backdrop-blur-[2px] bottom-[100px] cursor-pointer "
            onClick={() => scrollDownHandler()}
          >
            <ArrowDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
