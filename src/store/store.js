import { configureStore } from '@reduxjs/toolkit';
import  authReducer  from "./authSlice";
import videoReducer from "./videoSlice";
import historyReducer from "./historySlice";
const store = configureStore({
    reducer: {
        user: authReducer,
        video:videoReducer,
        history:historyReducer
    },
})

export default store