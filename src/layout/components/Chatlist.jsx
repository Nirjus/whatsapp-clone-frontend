import React from "react"
import {useDispatch, useSelector} from "react-redux"
import ChatListHeader from "../components/ChatListHeader.jsx"
import SearchBar from "../components/SearchBar.jsx"
import List from "../components/List.jsx"
import ContactList from "./ChatList/ContactList"
const Chatlist = () => {
     const dispatch = useDispatch()
    const {contactPage, contactSearch} = useSelector((state) => state.initUser);
    const [pageType, setPageType] = React.useState("default");

    React.useEffect(() => {
        if(contactPage){
          setPageType("all-contacts")
        }else{
          setPageType("default")
        }
    },[contactPage])
    const searchHandler = (value) => {
      dispatch({
        type: "SET_CONTACT_SEARCH",
        contactSearch: value
      })
    }
  return (
    <div className=' bg-panel-header-background flex flex-col max-h-screen z-20'>
      {
           pageType === "default"  && (
            <>
            <ChatListHeader />
            <SearchBar placeholder={"Search or Start chat"} searchTerm={contactSearch} setSearchTerm={searchHandler} />
            <List />
            </>
           )
      }{
        pageType === "all-contacts" && <ContactList />
      }
     
    </div>
  )
}

export default Chatlist