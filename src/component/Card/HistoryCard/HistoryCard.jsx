import React from 'react';
import "./HistoryCard.css";
import {MdDelete} from "react-icons/md";
import {removeFromUserHistory} from "../../../store/historySlice";
import {useDispatch} from "react-redux";
function HistoryCard({video}){
  
  const dispatch = useDispatch();
  
  const handleClick = ()=>{
    dispatch(removeFromUserHistory(video._id))
  }
   
  return (
    <div className='flex flex-row align-center w-full text-white card-border cursor-pointer'>
       <div className='mx-3 my-3'>
           <img src={video.hasOwnProperty("thumbnail") ? video.thumbnail : `https://i.ytimg.com/vi/${video._id}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCkJioqTARJQLMSGO6ThdiXV-owcg`} alt="thumbnail" className='w-56 rounded-xl'/>
       </div>
       <div className='mx-1 my-3 flex flex-col'>
          <h4 className='font-bold text-lg'>{video.title}</h4>
          <small className='text-sm font-medium	 text-slate-400  my-3'>{video.channel}</small>
          <p className='w-11/12 text-sm	'>{video.description.slice(0,180)}</p>
       </div>
       <div className='self-center ml-7'>
          <MdDelete color='white' size={25} onClick={handleClick} />
       </div>
    </div>
  )
}

export default HistoryCard