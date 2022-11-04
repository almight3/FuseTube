import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

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
        .addCase(addToUserHisotry.pending,(state)=>{
            state.status = STATUSES.LOADING
        }) 
        .addCase(addToUserHisotry.fulfilled,(state,action)=>{
            state.status = STATUSES.LOADING;
            state.history = action.payload.history;
        })
        .addCase(addToUserHisotry.rejected,(state,action)=>{
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
export const getUserAllHistory = createAsyncThunk("user/history",async(thunkAPI)=>{
    try{
        const res = await axios.get("http://localhost:5000/api/v1/user/history",{
            withCredentials:true  
        },
        {
        headers: {
            "Content-Type": "application/json",
          },
         });
        return res.data;
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response.data.message)    
    }
});

export const addToUserHisotry = createAsyncThunk("user/addhistory",async(video,thunkAPI)=>{
 try{
    console.log(video)
    const res = await axios.post("http://localhost:5000/api/v1/user/history",{
    video
    },
    {
        withCredentials:true  
    },
    {
        headers: {
            "Content-Type": "application/json",
        },
     });
     return res.data;
 }
 catch(error){
    return thunkAPI.rejectWithValue(error.response.data.message)  
 }
});

export const removeFromUserHistory = createAsyncThunk("user/removehisotry",async(id,thunkAPI)=>{
    try{
    const res = await axios.delete(`http://localhost:5000/api/v1/user/history/${id}`,{
        withCredentials:true  
    },
    {
        headers: {
            "Content-Type": "application/json",
        },
     });
    return res.data;
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response.data.message)  
    }
});

export const clearUserHistory = createAsyncThunk("user/clear/hisotry",async(thunkAPI)=>{
    try{
    const res = await axios.delete(`http://localhost:5000/api/v1/user/clear/history`,{
        withCredentials:true  
    },
    {
        headers: {
            "Content-Type": "application/json",
        },
     });
    return res.data;
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response.data.message)  
    }
});

