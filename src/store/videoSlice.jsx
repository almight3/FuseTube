import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';


export const STATUSES = Object.freeze({
    IDLE:"idle",
    ERROR:"error",
    LOADING:"loading"
});
const videoSlice = createSlice({
    name:"video",
    initialState:{
        data:[],
        status:STATUSES.IDLE,
        error:"",
        searchQuery:""
    },
    reducers:{
     clearError:(state)=>{
        state.error = null;
      }, 
      searchByFilter :(state,action)=>{
       state.searchQuery = action.payload;
      },
      clearSearchQuery:(state)=>{
        state.searchQuery = ""
      }

    },
    extraReducers:(builders)=>{
        builders
        .addCase(getAllVideos.pending,(state,action)=>{
          state.status = STATUSES.LOADING;   
        })
        .addCase(getAllVideos.fulfilled,(state,action)=>{
            state.status = STATUSES.IDLE;
            state.data = action.payload.videos
        })
        .addCase(getAllVideos.rejected,(state,action)=>{
            state.status = STATUSES.ERROR;
            state.error = action.payload;
            toast.error(state.error);

        })
    }
});

export default videoSlice.reducer;
export const { clearError, searchByFilter, clearSearchQuery } = videoSlice.actions;

export const getAllVideos = createAsyncThunk("fetch/video",async(thunkAPI)=>{
 try{
    const res = await axios.get("http://localhost:5000/api/v1/video");
    return res.data
 }
 catch(error){
    return thunkAPI.rejectWithValue(error.response.data.message)       
 }
})
