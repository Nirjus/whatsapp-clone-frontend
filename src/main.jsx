import React from 'react'
import ReactDOM from 'react-dom/client'
import {Toaster} from "react-hot-toast"
import App from './App.jsx'
import './App.css'
import {CssBaseline} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Provider} from 'react-redux';
import Store from './redux/store.js';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={Store}>
   <ThemeProvider theme={darkTheme}>
   <CssBaseline />
     <App />
     <Toaster />
   </ThemeProvider>
   </Provider>

)
