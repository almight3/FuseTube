import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import toast from 'react-hot-toast';
import FUZETUBEAPI from './api';
export const STATUSES = Object.freeze({
    IDLE:"idle",
    ERROR:"error",
    LOADING:"loading"
});


const likeSlice = createSlice({
    name:"like",
    initialState:{
        status:STATUSES.IDLE,
        like:[],
        error:{}
    },
    reducers:{
      clearError:(state)=>{
        state.error = null;
      }  

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getUserLikedVideos.pending,(state)=>{
            state.status = STATUSES.IDLE;
        })
        .addCase(getUserLikedVideos.fulfilled,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.like = action.payload.likes;
        })
        .addCase(getUserLikedVideos.rejected,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.error = action.payload.error
            toast.error(state.error);
        })
        .addCase(addToUserLiked,(state)=>{
            state.status = STATUSES.LOADING;
        })
        .addCase(addToUserLiked.fulfilled,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.like = action.payload.likes;
            toast.success("video added to liked");
        })
        .addCase(addToUserLiked.rejected,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.error = action.payload;
            toast.error(state.error);
        })
        .addCase(removeFromUserLiked.pending,(state)=>{
            state.status = STATUSES.LOADING;
        })
        .addCase(removeFromUserLiked.fulfilled,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.like = action.payload.likes;
            toast.success("video removed from Liked")
        })
        .addCase(removeFromUserLiked.rejected,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.error = action.payload;
            toast.error(state.error);
        })

    }
})

export default likeSlice.reducer;
export const {clearError} = likeSlice.actions;
// fetch user liked videos
export const getUserLikedVideos = createAsyncThunk("user/like",async(token,thunkAPI)=>{
    try{
        const res = await axios.get(`${FUZETUBEAPI}/api/v1/user/liked`,
          {
            headers:{
                "Content-type":"application/json",
                "authorization":`bearer ${token}`
            }
           });
        return res.data;
    }
    catch(error){
     return thunkAPI.rejectWithValue(error.response.data.message);
    }

})

// add in user liked videos

export const addToUserLiked = createAsyncThunk("user/addToLike",async(data,thunkAPI)=>{
    try{
        const {video,token} = data
        const res = await axios.post(`${FUZETUBEAPI}/api/v1/user/liked`,{
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

export const removeFromUserLiked = createAsyncThunk("user/remvoveFromLike",async(data,thunkAPI)=>{
    try{
        const {id,token} = data;
        const res = await axios.delete(`${FUZETUBEAPI}/api/v1/user/liked/${id}`,
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


