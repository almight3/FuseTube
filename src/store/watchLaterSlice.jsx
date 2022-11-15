import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import toast from 'react-hot-toast';
import FUZETUBEAPI from './api';
export const STATUSES = Object.freeze({
    IDLE:"idle",
    ERROR:"error",
    LOADING:"loading"
});


const watchLaterSlice = createSlice({
    name:"watchlater",
    initialState:{
        status:STATUSES.IDLE,
        watchLater:[],
        error:{}
    },
    reducers:{
      clearError:(state)=>{
        state.error = null;
      }  

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getUserWatchlater.pending,(state)=>{
            state.status = STATUSES.IDLE;
        })
        .addCase(getUserWatchlater.fulfilled,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.watchLater = action.payload.watchLater;
        })
        .addCase(getUserWatchlater.rejected,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.error = action.payload
            toast.error(state.error);
        })
        .addCase(addToWatchLater,(state)=>{
            state.status = STATUSES.LOADING;
        })
        .addCase(addToWatchLater.fulfilled,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.watchLater = action.payload.watchLater;
            toast.success("video added to watchLater");
        })
        .addCase(addToWatchLater.rejected,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.error = action.payload;
            toast.error(state.error);
        })
        .addCase(removeWatchLater.pending,(state)=>{
            state.status = STATUSES.LOADING;
        })
        .addCase(removeWatchLater.fulfilled,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.watchLater = action.payload.watchLater;
            toast.success("video removed from watch later")
        })
        .addCase(removeWatchLater.rejected,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.error = action.payload;
            toast.error(state.error);
        })

    }
})

export default watchLaterSlice.reducer;
export const {clearError} = watchLaterSlice.actions;
// fetch  videos in watch later
export const getUserWatchlater = createAsyncThunk("user/watchlater",async(token,thunkAPI)=>{
    try{
        const res = await axios.get(`${FUZETUBEAPI}/api/v1/user/watchlater`,
          {
          headers: {
              "Content-Type": "application/json",
              "authorization":`bearer ${token}`
            },
           });
        return res.data;
    }
    catch(error){
     return thunkAPI.rejectWithValue(error.response.data.message);
    }

})

// add to watchlater

export const addToWatchLater = createAsyncThunk("user/addToWatchLater",async(data,thunkAPI)=>{
    try{

        const {video,token} = data;
        const res = await axios.post(`${FUZETUBEAPI}/api/v1/user/watchlater`,{
         video 
        },
        {
        headers: {
            "Content-Type": "application/json",
            "authorization":`bearer ${token}`
          },
         }
        );

        return res.data;
    }
    catch(error){
     return thunkAPI.rejectWithValue(error.response.data.message);
    }

})

// remove from watch later
export const removeWatchLater = createAsyncThunk("user/remvoveFromWatchLater",async(data,thunkAPI)=>{
    try{
        const {id,token} = data;
        const res = await axios.delete(`${FUZETUBEAPI}/api/v1/user/watchlater/${id}`,
        {
        headers: {
            "Content-Type": "application/json",
            "authorization":`bearer ${token}`
          },
         }
        );
        
        return res.data;
    }
    catch(error){
     return thunkAPI.rejectWithValue(error.response.data.message);
    }

})


