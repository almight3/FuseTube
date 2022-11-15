import React from 'react'
import {MdOutlineWatchLater} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {addToWatchLater} from "../../store/watchLaterSlice";
function Card({item}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector(state=>state.user)
  const handelClick = ()=>{
  navigate(`/video/${item._id}`) 
  }
  const handleWatchLater = ()=>{
    dispatch(addToWatchLater({video:item,token}))
  }

  return (
    <div className='w-3/12 rounded-xl	 bg-slate-900	mx-5 my-6 border-box shadow-xl hover:-translate-y-1 hover:scale-105	transition  duration-500 ease-in-out'>
     <img src={item.hasOwnProperty("thumbnail") ? item.thumbnail : `https://i.ytimg.com/vi/${item._id}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCkJioqTARJQLMSGO6ThdiXV-owcg`} alt="thumbnail" className='w-full h-54 rounded-xl cursor-pointer' onClick={handelClick} /> 
     <ul className='flex flex-row flex-wrap justify-around items-center my-2 mt-3'>
       <li>
       <img src={item.profile} alt="profile pic" className="h-11 rounded-full" />
       </li>
       <li className='text-white text-sm	w-3/5	font-semibold'>
       <h3>{item.title}</h3>
       <small className='text-sm font-medium text-slate-300  my-2'>{item.channel}</small>
       </li>
       <li>
         <MdOutlineWatchLater color='white' size={20} className="cursor-pointer" onClick={handleWatchLater} />
       </li>
     </ul>
    
    </div>
  )
}

export default Card