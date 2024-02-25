export const HOST = import.meta.env.VITE_BACKEND_URL || "";

const AUTH_ROUTE = `${HOST}/api/auth`;
const MESSAGE_ROUTE = `${HOST}/api/messages`;

// user routes
export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;

export const ONBOARD_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`;

export const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`;


// message routes
export const ADD_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-message`;

export const GET_MESSAGES_ROUTE = `${MESSAGE_ROUTE}/get-messages`;

export const ADD_AUDIO_MESSAGE = `${MESSAGE_ROUTE}/add-audio`;

export const ADD_IMAGE_MESSAGE = `${MESSAGE_ROUTE}/add-image`;

export const ADD_VIDEO_MESSAGE = `${MESSAGE_ROUTE}/add-video`;

export const GET_INITIAL_CONTACTS = `${MESSAGE_ROUTE}/get-initial-contacts`;

// export const GET_USER_ROUTE = `${AUTH_ROUTE}/get-user`;