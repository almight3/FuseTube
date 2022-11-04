import {useEffect,useState} from 'react';
import ReactPlayer from 'react-player/youtube';
import {useParams} from "react-router-dom"; 
import {CgPlayListAdd} from "react-icons/cg";
import {addToUserHisotry} from "../../store/historySlice";
import  {addToUserLiked,removeFromUserLiked,getUserLikedVideos} from "../../store/likeSlice";
import { useDispatch,useSelector } from 'react-redux';
import LikeFill from "../../Asset/LikeFill.png";
import Like from "../../Asset/Like.png";
import axios from "axios";

const isVideoLiked = (like,videoId)=>{
  return like.some((video)=>video._id === videoId)
}

function Video() {
  const {id} = useParams();  
  const [videoDetail,setVideoDetail] = useState({});
  const dispatch = useDispatch();
  const {like} = useSelector(state=>state.like)
  const [isLiked,setIsLiked] = useState(isVideoLiked(like,id))
  useEffect(()=>{
  const getVideoDetail = async ()=>{
   const {data} =  await axios.get(`http://localhost:5000/api/v1/video/${id}`);
   setVideoDetail(data.videoDetail)
  }
  getVideoDetail();
  dispatch((getUserLikedVideos()))
  },[id,dispatch]);

  useEffect(()=>{
   if(isVideoLiked(like,id)){
    setIsLiked(true)
   }
   else{
    setIsLiked(false)
   }
 },[like,id])

  const likeHandler = ()=>{
    if(isVideoLiked(like,id)){
      dispatch(removeFromUserLiked(id))
    }
    else{
      dispatch(addToUserLiked(videoDetail))
    }
  }

  return (
  
     <div className='relative left-80 top-28 w-10/12'>
     <ReactPlayer 
     url={`https://www.youtube.com/watch?v=${id}`} 
     width="98%"
     controls={true}
     style={{ aspectRatio: "9/16" }}
     playing
     onPlay={() => dispatch(addToUserHisotry(videoDetail))}
     />
     <p className='text-white text-lg font-medium	tracking-wide	m-3'>{videoDetail.title}</p>
     <div className='flex flex-row flex-wrap justify-between justify 	w-11/12		'>
        <div className='flex flex-row items-center'>
          <img src={videoDetail.profile} alt="profile pic" className="h-11 rounded-full mx-3" />
          <small className='text-white font-semibold	text-sm' >{videoDetail.channel }</small>
        </div>
        <div className='flex flex-row items-center justify-around'>
          {isLiked ? <img src={LikeFill} alt="like" className='w-8 pb-2' onClick={likeHandler} /> : 
          <img src={Like} alt="like" className='w-8 pb-2' onClick={likeHandler} />}
          <CgPlayListAdd color='white' size={25} className="m-2"/>
        </div>
     </div>
     <p className='w-11/12 m-4 text-white'>{videoDetail.description}</p>
   </div>
    
  )
}

export default Video