import React from "react";
import { TimeFormat } from "../../../utils/TimeFormat";
import MessageStatus from "../Common/MessageStatus";
import { HOST } from "../../../utils/ApiRoutes";

const VideoMessage = ({ message, user, currentChatUser, searchBox=false }) => {
  return (
    <div>
      <div
        className={` text-white px-2 py-[5px] text-sm rounded-md flex flex-col gap-2 items-end w-fit ${
          message.senderId === currentChatUser?.id
            ? "bg-incoming-background"
            : "bg-outgoing-background"
        }`}
      >
        <video
          src={`${HOST}/${message.message}`}
          controls
          className={` rounded-md ${searchBox ? "w-[300px]" : "800px:w-[500px] 400px:w-[300px] w-[200px]"}`}
        />
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
  );
};

export default VideoMessage;
