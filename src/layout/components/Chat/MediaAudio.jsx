import React from 'react'
import { useSelector } from 'react-redux';
import VoiceMessage from './VoiceMessage';

const MediaAudio = () => {
    const [filteredImages, setFilteredImages] = React.useState([]);
    const {messages} = useSelector((state) => state.initMessage);
    const {user, currentChatUser} = useSelector((state) => state.initUser);
    React.useEffect(() => {
       if(messages){
        setFilteredImages(messages.filter((audio) => audio.type === "audio"))
       }else{
        setFilteredImages([]);
       }
    },[messages])
  return (
    <div className='relative overflow-auto custom-scrollbar max-h-[70vh] h-auto'>
    <div className="flex justify-center">
      {
          filteredImages.length === 0 && (
              <p className=' w-full text-center text-[#838383c9]'>No Audio found</p>
          )
      }
      <div className=' w-full  flex flex-col items-center gap-5 pb-5'>
      {
          filteredImages.map((audio, index) => (
              <div key={index} className=''>
               <VoiceMessage message={audio} user={user} currentChatUser={currentChatUser} />
              </div>
          ))
      }
      </div>
    </div>
</div>
  )
}

export default MediaAudio