import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import FUZETUBEAPI from './api';
export const STATUSES = Object.freeze({
    IDLE:"idle",
    ERROR:"error",
    LOADING:"loading"
});

const historySlice = createSlice({
    name:"history",
    initialState:{
        history:[],
        status:STATUSES.IDLE,
        error:""
    },
    reducer:{
      clearError:(state)=>{
        state.error = null;
      } 
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getUserAllHistory.pending,(state)=>{
            state.status = STATUSES.LOADING;
        })
        .addCase(getUserAllHistory.fulfilled,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.history = action.payload.history;
        })
        .addCase(getUserAllHistory.rejected,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.error = action.payload;
        })
        .addCase(addToUserHistory.pending,(state)=>{
            state.status = STATUSES.LOADING
        }) 
        .addCase(addToUserHistory.fulfilled,(state,action)=>{
            state.status = STATUSES.LOADING;
            state.history = action.payload.history;
        })
        .addCase(addToUserHistory.rejected,(state,action)=>{
            state.status =  STATUSES.IDLE;
            state.error = action.payload;
        }) 
        .addCase(removeFromUserHistory.pending,(state)=>{
            state.status = STATUSES.LOADING;
        })
        .addCase(removeFromUserHistory.fulfilled,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.history = action.payload.history;
            toast.success("video removed successfully");
        })
        .addCase(removeFromUserHistory.rejected,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.error = action.payload;
            toast.error(state.error)
        })
        .addCase(clearUserHistory.pending,(state)=>{
            state.status = STATUSES.LOADING;
        })
        .addCase(clearUserHistory.fulfilled,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.history = action.payload.history;
            toast.success("all user history cleared")
        })
        .addCase(clearUserHistory.rejected,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.error = action.payload;
            toast.error(state.error)
        })
        
    }
});

export default historySlice.reducer;
export const { clearError } = historySlice.actions;
export const getUserAllHistory = createAsyncThunk("user/history",async(token,thunkAPI)=>{
    try{
        
        const res = await axios.get(`${FUZETUBEAPI}/api/v1/user/history`,{
            headers:{
                    "Content-type":"application/json",
                    "authorization":`bearer ${token}`
            }
         });
        return res.data;
    }
    catch(error){
        console.log(error)
        return thunkAPI.rejectWithValue(error.response.data.message)    
    }
});

export const addToUserHistory = createAsyncThunk("user/addhistory",async(data,thunkAPI)=>{
    try{
     const {video, token} = data
    const res = await axios.post(`${FUZETUBEAPI}/api/v1/user/history`,
       {
        video 
       },
       {
       headers: {
           "Content-Type": "application/json",
           "authorization":`bearer ${token}`
         },
    });
     return res.data;
 }
 catch(error){
    return thunkAPI.rejectWithValue(error.response.data.message)  
 }
});

export const removeFromUserHistory = createAsyncThunk("user/removehisotry",async(data,thunkAPI)=>{
    try{
        const {id,token} = data;
        console.log(token)
    const res = await axios.delete(`${FUZETUBEAPI}/api/v1/user/history/${id}`,
    {
        headers:{
            "Content-type":"application/json",
            "authorization":`bearer ${token}`
    }
     });
    return res.data;
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response.data.message)  
    }
});

export const clearUserHistory = createAsyncThunk("user/clear/hisotry",async(token,thunkAPI)=>{
    try{
    const res = await axios.delete(`${FUZETUBEAPI}/api/v1/user/clear/history`,
    {
        headers:{
            "Content-type":"application/json",
            "authorization":`bearer ${token}`
        }
     });
    return res.data;
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response.data.message)  
    }
});

