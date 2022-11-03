import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import toast from 'react-hot-toast';


export const STATUSES = Object.freeze({
    IDLE:"idle",
    ERROR:"error",
    LOADING:"loading"
});


const likeSlice = createSlice({
    name:"slice",
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
            state.like = action.payload.like;
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
            state.like = action.payload.like;
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
            state.status = STATUSES.LOADING;
            state.like = action.payload.like;
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
export const getUserLikedVideos = createAsyncThunk("user/like",async(thunkAPI)=>{
    try{
        const res = await axios.get("http://localhost:5000/api/v1/user/liked");
        return res.data;
    }
    catch(error){
     return thunkAPI.rejectWithValue(error.response.data.message);
    }

})

// add in user liked videos

export const addToUserLiked = createAsyncThunk("user/addToLike",async(video,thunkAPI)=>{
    try{
        const res = await axios.post("http://localhost:5000/api/v1/user/liked",{
         video 
        },
        {
          withCredentials:true  
        },
        {
        headers: {
            "Content-Type": "application/json",
          },
         }
        );

        return res.data;
    }
    catch(error){
     return thunkAPI.rejectWithValue(error.response.data.message);
    }

})

export const removeFromUserLiked = createAsyncThunk("user/addToLike",async(id,thunkAPI)=>{
    try{
        const res = await axios.delete(`http://localhost:5000/api/v1/user/liked/${id}`,
        {
          withCredentials:true  
        },
        {
        headers: {
            "Content-Type": "application/json",
          },
         }
        );
        
        return res.data;
    }
    catch(error){
     return thunkAPI.rejectWithValue(error.response.data.message);
    }

})


