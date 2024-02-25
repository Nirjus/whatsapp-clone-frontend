import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import {Buffer} from "buffer";
import { Camera } from "lucide-react";
import ContextMenue from "./ContextMenue";
import defaultAvatar from "../../assets/images/default_avatar.png";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

const Avatars = ({ size, image, setImage, defaultImage }) => {
  const [hover, setHover] = React.useState(false);
  const [isContextMenueVisible, setIsContextMenueVisible] = useState(false);
  const [contextMenueCordinates, setContextMenueCordinates] = useState({
    x: 0,
    y: 0,
  });
  const [Library, setLibrary] = React.useState(false);
  const [capturePhoto, setCapturePhoto] = useState(false);
  const api = "https://api.multiavatar.com";
  const API_KEY = "ADbjotvadZmVfw";
  const [avatars, setAvatars] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const contextMenueOptions = [
    {
      name: "Take a Photo",
      callBack: () => {
        setCapturePhoto(true)
      },
    },
    {
      name: "Chosse from Library",
      callBack: () => {
        setLibrary(true);
        callingRandomAvatars();
      },
    },
    {
      name: "Upload a Photo",
      callBack: () => {
        photoPickerChange();
      },
    },
    {
      name: "Remove Photo",
      callBack: () => {
        setImage(defaultAvatar);
      },
    },
  ];
  const showContextMenue = (e) => {
    e.preventDefault();
    setContextMenueCordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenueVisible(true);
  };
  const photoPickerChange = () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.addEventListener("change", (e) => {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setImage(fileReader.result);
        }
      };
    });
    inputFile.click();
  };
 
    const images = [
      defaultImage
    ];
    async function callingRandomAvatars(){
      const character = "ZXCVBNMQWERTYUIOPASDFGHJKLzxcvbnmasdfghjklqwertyuiop0147258369";
      let result = "";
      const characterLength = character.length;
    for(let i=0; i<8; i++){
      result += character.charAt(Math.floor(Math.random() * characterLength));
      await axios.get(`${api}/${result}?apikey=${API_KEY}`).then((res) => {
        console.log(res.data)
        const buffer = new Buffer(res.data);
         images.push(buffer.toString("base64"))

      }).catch((error) => {
        console.log(error)
      })
    }
         setAvatars(images);
         setIsLoading(false); 
  }
 

  return (
    <div className=" flex items-center justify-center">
      {size === "sm" && (
        <Avatar src={image} alt="avatar" className=" cursor-pointer" />
      )}
      {size === "lg" && (
        <Avatar
          src={image}
          alt="avatar"
          sx={{ width: 60, height: 60 }}
          className=" cursor-pointer"
        />
      )}
      {
        size == "mlg" && (
          <Avatar
          src={image}
          alt="avatar"
          sx={{ width: 90, height: 90 }}
          className=" cursor-pointer"
        />
        )
      }
      {size === "xl" && (
        <div
          className=" relative z-0 w-fit h-fit rounded-full"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div
            className={` absolute ${
              hover ? " visible" : "hidden"
            } bg-photopicker-overlay-background flex flex-col  w-full h-full cursor-pointer justify-center items-center rounded-full z-10 `}
            onClick={(e) => showContextMenue(e)}
            id="context-opener"
          >
            <div
              className=" rounded-full bg-[#ffffffcd] p-2"
              id="context-opener"
            >
              <Camera size={20} fill="black" id="context-opener" className="" />
            </div>
            <span className=" text-center" id="context-opener">
              change <br /> profile <br /> photo
            </span>
          </div>
          <Avatar src={image} alt="avatar" sx={{ width: 240, height: 240 }} />
        </div>
      )}
      {isContextMenueVisible && (
        <ContextMenue
          options={contextMenueOptions}
          cordinates={contextMenueCordinates}
          contextMenue={isContextMenueVisible}
          setContextMenue={setIsContextMenueVisible}
        />
      )}
      {Library && (
        <PhotoLibrary setImage={setImage} hidePhotoGallary={setLibrary} avatars={avatars} isLoading={isLoading} />
      )}
      {
        capturePhoto && (
            <CapturePhoto setImage={setImage} hide={setCapturePhoto} />
        )
      }
    </div>
  );
};

export default Avatars;
