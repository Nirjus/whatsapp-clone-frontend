import React from "react";
import { X } from "lucide-react";

import CircularProgress from "@mui/material/CircularProgress"

const PhotoLibrary = ({ setImage, hidePhotoGallary, avatars,isLoading }) => {
 
  return (
    <div className=" fixed z-10 top-0 left-0 backdrop-blur-[2px] bg-[#00000040]  w-full h-auto min-h-[100vh] max-w-full flex justify-center items-center">
        <div className=" h-auto w-fit bg-gray-900 rounded-lg p-4">
        <div className=" flex justify-end pb-5 ">
         <div className=" w-full">
         <h1 className=" text-center underline font-bold text-lg ">Select your avatar</h1>
         </div>
          <X
            size={25}
            className=" cursor-pointer active:border rounded "
            onClick={() => hidePhotoGallary(false)}
          />
        </div>
       {
        isLoading ? (
         <div className=" w-fit m-auto">
           <CircularProgress />
         </div>
        ):(
          <div className=" grid grid-cols-3 1300px:gap-14 800px:gap-10 400px:gap-6 gap-3  p-5 w-full">
          {avatars && avatars.map((image, index) => (
            <div
              key={index}
              onClick={() => {
                setImage(`${index === 0 ? image : `data:image/svg+xml;base64,${image}`}`), hidePhotoGallary(false);
              }}
              className=" border-[5px] rounded-full border-transparent hover:border-[#4a6ee5]"
            >
              <img
                src={`${index === 0 ? image : `data:image/svg+xml;base64,${image}`}`}
                alt="avatar"
                className=" m-[2px] cursor-pointer w-14 h-14 sm:w-16 sm:h-16 md:h-24 md:w-24 lg:w-28 lg:h-28 xl:h-32 xl:w-32 rounded-full "
              />
            </div>
          ))}
        </div>
        )
       }
      </div>
    </div>
  );
};

export default PhotoLibrary;
