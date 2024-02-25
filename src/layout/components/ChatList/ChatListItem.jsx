import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatars from "../Avatar";
import { TimeFormat } from "../../../utils/TimeFormat";
import MessageStatus from "../Common/MessageStatus";
import { FaCamera, FaMicrophone, FaVideo } from "react-icons/fa";

const ChatListItem = ({ data, isContactPage = false }) => {
         const dispatch = useDispatch();
         const {user} = useSelector((state) => state.initUser);
       const HandleContactClick = () => {
            // if(currentChatUser.id === data?.id){
                dispatch({
                    type: "currentChatUser",
                    payload:{
                        id:data?.id,
                        name: data?.name,
                        email: data?.email,
                        avatar: data?.avatar,
                        about: data?.about
                    }
                })
                dispatch({
                    type: "setAllContacts",
                    payload: false
                })
            // }
       }

  return (
    <div
      className={`flex cursor-pointer items-center hover:bg-background-default-hover `}
      onClick={HandleContactClick}
    >
      <div className=" min-w-fit px-5 pt-3 pb-1">
        <Avatars size={"lg"} image={data?.avatar} />
      </div>
      <div className="flex min-h-full flex-col justify-center  mt-3 pr-2 w-full">
        <div className="flex justify-between">
          <div className="">
            <span className=" text-white">{data?.name}</span>
          </div>
          {
            !isContactPage && (
              <div className="">
                 <span className={`${!data?.totalUnreadMessages > 0 ?"text-secondary" :" text-icon-green" } text-sm`}>
                  {TimeFormat(data?.createdAt)}
                 </span>
              </div>
            )
          }
        </div>
        <div className="flex border-b border-[#505050] pb-2 pt-1 pr-2">
          <div className="flex justify-between w-full">
            <span className=" text-secondary line-clamp-1 text-sm">
              {isContactPage ? data?.about || "\u00A0" : 
              <div className=" flex items-center gap-1 max-w-[200px] xl:max-w-[300px]">
                {
                  data?.senderId === user?.id && (
                    <MessageStatus messageStatus={data?.messageStatus} />
                  )
                }    
                {
                  data?.type === "text" && (
                    <span className=" truncate">{data?.message}</span>
                  )
                }
                {
                  data?.type === "audio" && (
                    <span className=" flex gap-1 items-center"><FaMicrophone /> Audio</span>
                  )
                }
                {
                  data?.type === "image" && (
                    <span className=" flex gap-1 items-center"><FaCamera /> Image</span>
                  )
                }
                {
                  data?.type === "video" && (
                    <span className=" flex gap-1 items-center"><FaVideo /> Video</span>
                  )
                }
              </div>
              }
            </span>
            {
              data?.totalUnreadMessages > 0 && (
                <span className=" bg-icon-green px-[7px] text-xs text-white flex justify-center items-center rounded-full">{data?.totalUnreadMessages}</span>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
