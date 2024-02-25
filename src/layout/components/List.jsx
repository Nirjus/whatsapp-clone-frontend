import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { GET_INITIAL_CONTACTS } from "../../utils/ApiRoutes";
import ChatListItem from "./ChatList/ChatListItem";

const List = () => {
   const dispatch = useDispatch();
  const {user, userContacts, filteredContacts} = useSelector((state) => state.initUser);
  
  useEffect(() => {
       const getContacts = async () => {
         try {
          const {data:{users,onlineUsers}} = await axios.get(`${GET_INITIAL_CONTACTS}/${user.id}`);
            dispatch({
              type: "SET_ONLINE_USERS",
              onlineUsers
            })
            dispatch({
              type: "SET_USER_CONTACTS",
              userContacts: users
            })
         } catch (error) {
             console.log(error)
         }
       };
      if(user.id){
        getContacts();
      }
  },[user, dispatch])
  return (
   <div className=" bg-search-input-container-background flex-auto overflow-auto max-h-full custom-scrollbar">
    {
      filteredContacts && filteredContacts.length >0 ? filteredContacts.map((contact) => (
        <ChatListItem data={contact} key={contact.id} />
      )) :  userContacts.map((contact) => (
        <ChatListItem data={contact} key={contact.id} />
      ))
    }
   </div>
  )
}

export default List