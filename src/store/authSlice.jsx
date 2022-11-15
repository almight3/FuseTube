import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import FUZETUBEAPI from './api';
export const STATUSES = Object.freeze({
    IDLE:"idle",
    ERROR:"error",
    LOADING:"loading"
});
const initialState = {
    user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): {},
    status:STATUSES.IDLE,
    error:"" ,
    isAuthenticated : localStorage.getItem("user") ? true : false,
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")): ""
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducer:{
    clearError:(state)=>{
        state.error = null;
    } 
    },
    extraReducers:(builder)=>{
     builder
     .addCase(signupUser.pending,(state)=>{
        state.status = STATUSES.LOADING;
     })
     .addCase(signupUser.fulfilled,(state,action)=>{
        state.status = STATUSES.IDLE;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        toast.success("user registered succefully");
     })
     .addCase(signupUser.rejected,(state,action)=>{
        state.status = STATUSES.IDLE;
        state.error = action.payload;
        state.isAuthenticated = false;
        toast.error(state.error);
     })
     .addCase(loginUser.pending,(state,action)=>{
        state.status = STATUSES.LOADING;
     })
     .addCase(loginUser.fulfilled,(state,action)=>{
        state.status = STATUSES.IDLE;
        state.user = action.payload.user;
        state.token=action.payload.user.token;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.user.token));
        toast.success("user loged in succefully")
        
     })
     .addCase(loginUser.rejected,(state,action)=>{
        state.status = STATUSES.IDLE;
        state.isAuthenticated = false;
        state.error = action.payload;
        toast.error(state.error)

     })
     .addCase(logoutUser.fulfilled,(state,action)=>{
        state.status = STATUSES.IDLE;
        state.isAuthenticated = false;
        state.user = null;
        state.token=null
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        toast.success(action.payload.message)
     })
    }
});


export default authSlice.reducer;
export const {clearError} = authSlice.actions;

export const signupUser = createAsyncThunk("user/signup",async(data,thunkAPI)=>{
   try{
    const {username,email,password,navigate} = data;
    
    const res = await axios.post(`${FUZETUBEAPI}/api/v1/register`,{
        username:username,
        email:email,
        password:password
    },
    {
        headers: {
            "Content-Type": "application/json",
        },
    }
    )
    navigate("/home");
    return res.data
   }
   catch(error){
   return thunkAPI.rejectWithValue(error.response.data.message)       
   }
});
export const loginUser = createAsyncThunk("login/user",async(data,thunkAPI)=>{
    try{
     const {email,password,navigate} = data;
     const res = await axios.post(`${FUZETUBEAPI}/api/v1/login`,{
        email:email,
        password:password
     },
     {
        headers: {
            "Content-Type": "application/json",
        },
     })
     navigate(-1)
     return res.data
    }
    catch(error){
     return thunkAPI.rejectWithValue(error.response.data.message)       
    }
});

export const logoutUser = createAsyncThunk("logout/user",async(thunkAPI)=>{
    try{
     const res = await axios.get(`${FUZETUBEAPI}/api/v1/logout`)
     return res.data
    }
    catch(error){
     return thunkAPI.rejectWithValue(error.response.data.message)       
    }
});

