import {configureStore} from "@reduxjs/toolkit";
import { initUserReducer } from "./reducer/user";
import { messageReducer } from "./reducer/messages";

const Store = configureStore({
    reducer:{
        initUser: initUserReducer,
        initMessage: messageReducer,
    },
    devTools: false,
})

export default Store