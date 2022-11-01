import {useEffect,useState} from 'react';
import ReactPlayer from 'react-player/youtube';
import {useParams} from "react-router-dom"; 
import {BiLike} from "react-icons/bi";
import {CgPlayListAdd} from "react-icons/cg";
import axios from "axios";
function Video() {
  const {id} = useParams();  
  const [videoDetail,setVideoDetail] = useState({});
  useEffect(()=>{
  const getVideoDetail = async ()=>{
   const {data} =  await axios.get(`http://localhost:5000/api/v1/video/${id}`);
   setVideoDetail(data.videoDetail)
  }
  getVideoDetail();
  },[id]);

  console.log(videoDetail)
  return (
    <div className='relative left-80 top-28 w-10/12'>
       <ReactPlayer 
       url={`https://www.youtube.com/watch?v=${id}`} 
       width="98%"
       controls={true}
       style={{ aspectRatio: "9/16" }}
       playing
       />
       <p className='text-white text-lg font-medium	tracking-wide	m-3'>{videoDetail.title}</p>
       <div className='flex flex-row flex-wrap justify-between justify 	w-11/12		'>
          <div className='flex flex-row items-center'>
            <img src={videoDetail.profile} alt="profile pic" className="h-11 rounded-full mx-3" />
            <small className='text-white font-semibold	text-sm' >{videoDetail.channel }</small>
          </div>
          <div className='flex flex-row items-center justify-around'>
            <BiLike color='white' size={25} className="m-2"/>
            <CgPlayListAdd color='white' size={25} className="m-2"/>
          </div>
       </div>
       <p className='w-11/12 m-4 text-white'>{videoDetail.description}</p>
   </div>
  )
}

export default Video