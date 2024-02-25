import React from 'react'
import { useSelector } from 'react-redux';
import { HOST } from '../../../utils/ApiRoutes';

const MediaImages = () => {
    const [filteredImages, setFilteredImages] = React.useState([]);
    const {messages} = useSelector((state) => state.initMessage);
    React.useEffect(() => {
       if(messages){
        setFilteredImages(messages.filter((image) => image.type === "image"))
       }else{
        setFilteredImages([]);
       }
    },[messages])
  return (
    <div className='relative overflow-auto custom-scrollbar max-h-[70vh] h-auto'>
          <div className="flex justify-center">
            {
                filteredImages.length === 0 && (
                    <p className=' w-full text-center text-[#838383c9]'>No Images found</p>
                )
            }
            <div className=' w-full  flex flex-wrap gap-5'>
            {
                filteredImages.map((image, index) => (
                    <div key={index} className=' w-[130px] p-1 rounded hover:bg-[#87878738] '>
                      <a href={`${HOST}/${image.message}`} target="blank" > <img src={`${HOST}/${image.message}`} alt="fileimage" className=' w-full h-full object-contain' /></a>
                    </div>
                ))
            }
            </div>
          </div>
    </div>
  )
}

export default MediaImages