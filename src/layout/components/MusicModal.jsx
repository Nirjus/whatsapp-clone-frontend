import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Pause, PlayIcon } from 'lucide-react';
import axios from 'axios';
import { ADD_AUDIO_MESSAGE } from '../../utils/ApiRoutes';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Button } from '@mui/material';
import { CircularProgressWithLabel } from './CircularProgress';

export default function MediaControlCard({audio, audioFile,audioPopup, setAudioPopup}) {
  const theme = useTheme();
  const [play, setPlay] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const audioRef = React.useRef();
  const dispatch = useDispatch();
  const {user, currentChatUser} = useSelector((state) => state.initUser);
  const {socket} = useSelector((state) => state.initMessage);

  const handleClose = () => setAudioPopup(false);
  function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }
  const handleSendAudio = async () => {
        try {
            const formData = new FormData()
            formData.append("audio", audioFile);
          await axios.post(ADD_AUDIO_MESSAGE, formData, {
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
          setAudioPopup(false)
        }).catch((error) => {
            toast.error(error)
            setUploadProgress(0); 
        })
        } catch (error) {
          toast.error(error);
          setUploadProgress(0); 
        }
    
  }

  const togglePlay = () => {
    const audioElement = audioRef.current;

    if (play) {
      audioElement.pause();
    } else {
      audioElement.play();
    }

    setPlay(!play);
  };
  const style = {
    display: "flex",
    justifyContent: "space-between",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
  };
  
  return (
    <Modal
    open={audioPopup}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Card sx={style}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
          {audioFile.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {bytesToSize(audioFile.size)}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent:"center",gap:"10px", alignItems: 'center', pl: 1, pb: 1 }}>
            {
                uploadProgress === 0 ? (
                    <Button variant="text" color="success" onClick={handleSendAudio}>Send</Button>
                ) : (
                   <CircularProgressWithLabel props={uploadProgress} />
                )
            }
          <IconButton aria-label="play/pause">
            {
                play ? <Pause fill='white' onClick={togglePlay} /> : <PlayIcon fill='white' onClick={togglePlay} />
            }
          </IconButton>
        </Box>
      </Box>
      <audio src={audio} ref={audioRef} hidden ></audio>
      <CardMedia
        component="img"
        sx={{ width: 160 }}
        image="https://www.thegreatapps.com/application/upload/Apps/2018/02/lake-way-live-wallpaper-107.png"
        alt="Live from space album cover"
      />
    </Card>
    </Modal>
  );
}