import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const STATUSES = Object.freeze({
    IDLE:"idle",
    ERROR:"error",
    LOADING:"loading"
});
const initialState = {
    user:{},
    status:STATUSES.IDLE,
    error:"" 
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducer:{
    logoutUser:(state)=>{
     state.user = null;
     state.isAuthenticated = false;
    },    
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
        state.isAuthenticated = true;
        toast.success("user loged in succefully")
     })
     .addCase(loginUser.rejected,(state,action)=>{
        state.status = STATUSES.IDLE;
        state.isAuthenticated = true;
        state.error = action.payload;
        toast.error(state.error)

     })
    }
});


export default authSlice.reducer;
export const { logoutUser,clearError} = authSlice.actions;

export const signupUser = createAsyncThunk("user/signup",async(data,thunkAPI)=>{
   try{
    const {username,email,password,navigate} = data;
    const res = await axios.post("http://localhost:5000/api/v1/register",{
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
     const {email,password} = data;
     const res = await axios.post("http://localhost:5000/api/v1/login",{
        email:email,
        password:password
     },
     {
        headers: {
            "Content-Type": "application/json",
        },
     })
     return res.data
    }
    catch(error){
     return thunkAPI.rejectWithValue(error.response.data.message)       
    }
});