import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux';
import { GET_ALL_CONTACTS } from '../../../utils/ApiRoutes'
import { BiArrowBack } from 'react-icons/bi';
import SearchBar from '../SearchBar';
import ChatListItem from "./ChatListItem"
const ContactList = () => {
    const [allConatcts, setAllContacts] = React.useState([]);
    const [searchterms, setSearchterms] = React.useState("");
    const [searchContacts, setSearchContacts] = React.useState([]);
    
    React.useEffect(() => {
           if(searchterms.length){
             const filterdData = {};
             Object.keys(allConatcts).forEach((key) => {
              filterdData[key] = allConatcts[key].filter((obj) => obj.name.toLowerCase().includes(searchterms.toLowerCase()))
             })
             setSearchContacts(filterdData);
           }else{
            setSearchContacts(allConatcts)
           }
    },[searchterms, allConatcts])

    const dispatch = useDispatch();
    const getBackToDefaultPageHandler = () => {
          dispatch({
            type:"setAllContacts",
            payload: false
          })
    }
    React.useEffect(() => {
    const getConatcts = async () => {
     try {
        const {data:{userGroupByleter}} = await axios.get(GET_ALL_CONTACTS);
        
        setAllContacts(userGroupByleter)
        setSearchContacts(userGroupByleter)
     } catch (error) {
        console.log(error)
     }
    }
    getConatcts();
    },[])
    
  return (
    <div className=' h-full flex flex-col'>
        <div className="h-16 flex items-end px-3 py-4">
            <div className="flex items-center gap-12 text-white">
                <BiArrowBack className=' cursor-pointer text-xl' onClick={getBackToDefaultPageHandler} />
                <span>New Chat</span>
            </div>
        </div>
        <SearchBar placeholder={"Search Contacts.."} searchTerm={searchterms} setSearchTerm={setSearchterms} />
        <div className='bg-search-input-container-background h-full'>
        {
            Object.entries(searchContacts).map(([initialLetter, userList]) => {
              
              return(
                userList.length > 0 &&
                <div className=' ' key={Date.now()+initialLetter}>
                  <div className=" text-teal-light pl-10 py-5">
                     {initialLetter}
                  </div>
                  {
                    userList.map(contact => {
                        return(
                            <ChatListItem data={contact} key={contact.id} isContactPage={true} />
                        )
                    })
                  }
                </div>
              )
            })
        }
        </div>
    </div>
  )
}

export default ContactList