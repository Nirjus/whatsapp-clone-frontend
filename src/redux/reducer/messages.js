import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    messages:[],
    socket: undefined,
    messagesSearch : false,
    videoCall: undefined,
    voiceCall: undefined,
    incommingVoiceCall: undefined,
    incommingVideoCall: undefined,
}

export const messageReducer = createReducer(initialState, (builder) => {
    builder.addCase("LOAD_MESSAGES", (state, action) => {
        state.loading = false,
        state.messages = action.messages
    })
    
    .addCase("SET_SOCKET", (state, action) => {
        state.loading = false,
        state.socket = action.socket
    })

    .addCase("ADD_MESSAGES", (state, action) => {
           state.loading = false,
           state.messages = [ ...state.messages, action.newMessage]
    })

    .addCase("SET_MESSAGE_SEARCH", (state) => {
        state.loading = false,
        state.messagesSearch = !state.messagesSearch
    })

    .addCase("SET_VIDEO_CALL", (state, action) => {
        state.loading = false,
        state.videoCall = action.videoCall
    })

    .addCase("SET_VOICE_CALL", (state, action) => {
        state.loading = false,
        state.voiceCall = action.voiceCall
    })
    .addCase("SET_INCOMING_VOICE_CALL", (state, action) => {
        state.loading = false,
        state.incommingVoiceCall = action.incommingVoiceCall
    })

    .addCase("SET_INCOMING_VIDEO_CALL", (state, action) => {
        state.loading = false,
        state.incommingVideoCall = action.incommingVideoCall
    })

    .addCase("END_CALL", (state) => {
        state.loading = false,
        state.voiceCall = undefined,
        state.videoCall = undefined,
        state.incommingVideoCall = undefined,
        state.incommingVoiceCall = undefined
    })
})