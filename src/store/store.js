import { configureStore } from '@reduxjs/toolkit';
import  authReducer  from "./authSlice";
import videoReducer from "./videoSlice";
import historyReducer from "./historySlice";
import likeReducer from './likeSlice';
import watchLaterReducer from './watchLaterSlice';
const store = configureStore({
    reducer: {
        user: authReducer,
        video:videoReducer,
        history:historyReducer,
        like:likeReducer,
        watchLater:watchLaterReducer
    },
})

export default store