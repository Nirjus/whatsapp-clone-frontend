import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_VIDEO_MESSAGE } from '../../utils/ApiRoutes';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { CircularProgressWithLabel } from './CircularProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export default function VideoModal({videoSrc, popupOff, setPopupOff, video}) {
   
  const handleClose = () => setPopupOff(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const dispatch = useDispatch();
  const {user, currentChatUser} = useSelector((state) => state.initUser);
  const {socket} = useSelector((state) => state.initMessage);

  const sendVideoHandler = async () => {
    try {
        const formData = new FormData()
        formData.append("video", video);
      await axios.post(ADD_VIDEO_MESSAGE, formData, {
        headers:{
            "Content-Type": "multipart/form-data",
          },
          params:{
            from: user?.id,
            to: currentChatUser?.id
          },
          onUploadProgress:(progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
        }   
      }).then((res) => {
      socket.emit("send-msg", {
        to: currentChatUser?.id,
        from: user?.id,
        message: res.data.message,
      });
      dispatch({
        type: "ADD_MESSAGES",
        newMessage: res.data.message,
        fromSelf: true,
      });
      setUploadProgress(0);
      setPopupOff(false)
    }).catch((error) => {
        toast.error(error)
        setUploadProgress(0); 
    })
    } catch (error) {
      toast.error(error);
      setUploadProgress(0); 
    }
  }
  function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }

  return (
      <Modal
        open={popupOff}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Card sx={{ width:"100%" }}>
      <CardActionArea>
       <video src={videoSrc} className=' aspect-video' controls autoPlay></video>
        <CardContent>
            <Box sx={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>
           <Box>
           <Typography gutterBottom variant="body2" component="div">
           {video.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
               {bytesToSize(video.size)}
          </Typography>
          
           </Box>
            {
                uploadProgress === 0 ? (
                    <Button variant="outlined" color="success" onClick={sendVideoHandler}>Send</Button>
                ) : (
                   <CircularProgressWithLabel props={uploadProgress} />
                )
            }
            </Box>
        
        </CardContent>
      </CardActionArea>
    </Card>
        </Box>
      </Modal>
  );
}