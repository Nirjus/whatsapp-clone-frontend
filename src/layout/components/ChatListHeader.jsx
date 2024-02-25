import {BsThreeDotsVertical, BsFillChatLeftTextFill} from "react-icons/bs"
import Avatars from './Avatar'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";
import ContextMenue from "./ContextMenue";
import { LogOut } from "lucide-react";
import {signOut} from "firebase/auth"
import { firebaseAuth } from "../../utils/FirebaseConfig";

const ChatListHeader = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.initUser);
  const {socket} = useSelector((state) => state.initMessage);
  const [isContextMenueVisible, setIsContextMenueVisible] = useState(false);
  const [contextMenueCordinates, setContextMenueCordinates] = useState({
    x: 0,
    y: 0,
  });
  
  const handleAllContactsPage  = () => {
   dispatch({
    type: "setAllContacts",
    payload: true
   })
  }
  const contextMenueOptions = [
    {
      name: (<div className=" flex items-center gap-3">Logout <LogOut color="#f76a74" size={21} /></div>),
      callBack: () => {
        socket.emit("signout", user.id)
       signOut(firebaseAuth)
      },
    }
  ]

  const showContextMenue = (e) => {
    e.preventDefault();
    setContextMenueCordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenueVisible(true);
  };

  return ( 
    <div className=' h-16 px-4 py-3 flex justify-between items-center'>
        <div className=" cursor-pointer">
            <Avatars size={"sm"} image={user?.avatar} />
        </div>
        <div className="flex gap-6">
           <BsFillChatLeftTextFill className=' cursor-pointer text-xl ' title={"New Chat"} onClick={handleAllContactsPage} />
          <>
          <BsThreeDotsVertical className=' cursor-pointer text-xl' title='Menue' id="context-opener" onClick={(e) => showContextMenue(e)} />
          {
            isContextMenueVisible && <ContextMenue
                                          options={contextMenueOptions}
                                          cordinates={contextMenueCordinates}
                                          contextMenue={isContextMenueVisible}
                                          setContextMenue={setIsContextMenueVisible}
            />
          }
          </>
        </div>
    </div>
  )
}

export default ChatListHeader