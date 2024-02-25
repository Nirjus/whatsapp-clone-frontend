import * as React from 'react';
import { ChevronDown, X } from "lucide-react";
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import SearchMessages from './SearchMessages';
import MediaImages from './MediaImages';
import MediaAudio from './MediaAudio';
import MediaVideo from "./MediaVideo"
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ChevronDown />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    backgroundColor:"#111b21",
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
    const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleMessageSearch = () => {
    dispatch({
      type: "SET_MESSAGE_SEARCH",
    });
  };
  
  return (
    <div className=" border-conversation-border border-l w-full bg-conversation-panel-background flex flex-col z-10 max-h-screen">
        <div className="h-16 px-4 py-5 flex gap-10 items-center border-l border-l-[#7c7c7c43] bg-panel-header-background text-primary-strong ">
        <X
          size={23}
          onClick={handleMessageSearch}
          className=" cursor-pointer"
        />
        <span className=" font-mono">Search Media</span>
      </div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Search Messages</Typography>
        </AccordionSummary>
         <AccordionDetails>
         <SearchMessages />
         </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Images</Typography>
        </AccordionSummary>
        <AccordionDetails>
         <MediaImages />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Audios</Typography>
        </AccordionSummary>
        <AccordionDetails>
         <MediaAudio />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Videos</Typography>
        </AccordionSummary>
        <AccordionDetails>
         <MediaVideo />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
