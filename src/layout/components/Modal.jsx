import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export default function BasicModal({imgSrc, imageFile, popupOff, setPopupOff, sendImageHandler}) {
 
  const handleClose = () => setPopupOff(false);
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
        <CardMedia
          component="img"
          height="140"
          image={imgSrc}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {imageFile.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
               {bytesToSize(imageFile.size)}
          </Typography>
           <div className=' my-4 flex justify-between '>
           <Button variant="outlined" color="success" onClick={() => sendImageHandler()}><span className=' font-bold'>Send</span></Button>
           <Button variant="outlined" color="success" onClick={() => setPopupOff(false)}> <span className=' font-bold'>Cancel</span> </Button>
           </div>
        </CardContent>
      </CardActionArea>
    </Card>
        </Box>
      </Modal>
  );
}