import React from "react";
import {  useSelector } from "react-redux";
import SearchBar from "../SearchBar";
import { TimeFormat } from "../../../utils/TimeFormat";

const SearchMessages = () => {
  const {currentChatUser} = useSelector((state) => state.initUser)
  const {messages} = useSelector((state) => state.initMessage);
  
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchedMessage, setSearchedMessages] = React.useState([]);

   React.useEffect(() => {
      if(searchTerm){
        setSearchedMessages(messages.filter((message) => message.type === "text" && message.message.includes(searchTerm)))
      }else{
        setSearchedMessages([])
      }
   },[searchTerm, messages])

  return (
      <div className=" relative overflow-auto custom-scrollbar max-h-[70vh] h-auto">
        <div className="flex items-center flex-col w-full sticky top-0 right-0">
          <SearchBar
            placeholder={"Search messages.."}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <span className=" mt-10 text-secondary">
          {
            !searchTerm.length && `Search for messages ${currentChatUser.name}`
          }
        </span>
        </div>
              <div className="flex justify-center h-auto flex-col">
                  {
                    searchTerm.length > 0 && !searchedMessage.length && <span className=" text-secondary w-full text-center">No messages found</span>
                  }
                  <div className=" flex w-full flex-col">
                     {
                      searchedMessage.map((message, index) => (
                        <div key={index} className=" flex flex-col justify-center hover:bg-background-default-hover w-full px-5 border-b rounded-xl border-b-[#7f7f7f87] py-5" >
                       <div className=" text-sm text-secondary">
                          {
                            TimeFormat(message.createdAt)
                          }
                       </div>
                       <div className=" text-icon-green">
                          {message.message}
                       </div>
                        </div>
                      ))
                     }
                  </div>
              </div>
      </div>
  );
};

export default SearchMessages;
