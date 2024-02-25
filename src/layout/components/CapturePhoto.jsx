import { Focus, X } from 'lucide-react'
import React, { useEffect } from 'react'
import IconButton from '@mui/material/IconButton';

const CapturePhoto = ({setImage, hide}) => {
    const videoRef = React.useRef(null);

   useEffect(() => {
        let stream;
        const startCamera = async () => {
            stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            videoRef.current.srcObject = stream;
        } 
        startCamera();
        return () => {
            stream?.getTracks().forEach((track) => track.stop());
        }
   },[])

    const photoCaptureHandler = () => {
     const canvas = document.createElement("canvas");
     canvas.width = videoRef.current.videoWidth;
     canvas.height = videoRef.current.videoHeight;
     canvas.getContext("2d").drawImage(videoRef.current, 0,0,canvas.width, canvas.height);
     setImage(canvas.toDataURL("image/jpeg"));
     hide(false)
    }

  return (
    <div className=' z-10 fixed top-0 left-0 backdrop-blur-[2px] bg-[#00000033]  w-full h-full max-h-[100vh] max-w-full flex justify-center items-center  gap-3 rounded-lg'>
        <div className="flex flex-col gap-4  h-fit w-2/6 max-800px:w-4/6 bg-gray-900 items-center rounded shadow-2xl shadow-[#262626] ">
        <div className=" w-full flex justify-end p-2">
          <X
            size={25}
            className=" cursor-pointer active:border rounded "
            onClick={() => hide(false)}
          />
        </div>
        <div className=' flex justify-center'>
           <video src="" width={"400"} autoPlay id='video' ref={videoRef}></video>
        </div>
        <div className=' border border-[#48474780] rounded-full mb-[50px]'>
        <IconButton color="secondary"
        onClick={() => photoCaptureHandler()}
        >
        <Focus size={25}/>
        </IconButton>
        </div>
        </div>
    </div>
  )
}

export default CapturePhoto