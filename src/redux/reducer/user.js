import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    user:{
      id: "",
        name:"",
        email:"",
        avatar: "",
        about: "",
    },
    isAuthenticated: false,
    loading: false,
    contactPage: false,
    currentChatUser:{
      id:"",
      name:"",
      email:"",
      avatar: "",
      about: "",
    },
    userContacts:[],
    onlineUsers:[],
    filteredContacts:[]
}

export const initUserReducer = createReducer(initialState,(builder) => {

    builder.addCase("loginSuccess", (state, action) => {
        const {id,  name, email, avatar, about } = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {
          id,
          name,
          email,
          avatar,
          about,
        };
      })
        .addCase("loginFail", (state) => {
            state.loading = false;
         })

         .addCase("loadUserSuccess", (state, action) => {
          const {id, name, email, avatar, about } = action.payload;
          state.isAuthenticated = true;
          state.loading = false;
          state.user = {
            id,
            name,
            email,
            avatar,
            about,
          };
         })

         .addCase("setAllContacts",(state, action) =>{
              state.isAuthenticated = true;
              state.contactPage = action.payload;
         })
         
         .addCase("currentChatUser", (state, action) => {
          const {id, name, email, avatar, about } = action.payload;
          state.isAuthenticated = true,
          state.currentChatUser={
           id, name, email, avatar, about
          }
         })

         .addCase("SET_USER_CONTACTS", (state,action) => {
              state.loading = false,
              state.isAuthenticated = true,
              state.userContacts = action.userContacts
         })

         .addCase("SET_ONLINE_USERS", (state, action) => {
          state.loading = false,
          state.isAuthenticated = true,
          state.onlineUsers = action.onlineUsers
         })

         .addCase("SET_CONTACT_SEARCH", (state, action) => {
             const filteredContacts = state.userContacts.filter((contact) => contact.name.toLowerCase().includes(action.contactSearch.toLowerCase()))
            
              return{
                ...state,
                contactSearch: action.contactSearch,
                filteredContacts,
              }
             
         })
})