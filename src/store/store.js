import { configureStore } from '@reduxjs/toolkit';
import  authReducer  from "./authSlice";
import videoReducer from "./videoSlice";
const store = configureStore({
    reducer: {
        user: authReducer,
        video:videoReducer
    },
})

export default store