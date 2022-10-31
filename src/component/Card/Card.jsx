import React from 'react'
import {MdOutlineWatchLater} from "react-icons/md";
function Card({item}) {
  return (
    <div className='w-96	h-72 rounded bg-slate-900	mx-5 my-6'>
     <img src={`https://i.ytimg.com/vi/${item._id}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCkJioqTARJQLMSGO6ThdiXV-owcg`} alt="thumbnail" className='w-96 h-52' /> 
     <ul className='flex flex-row flex-wrap justify-around items-center	 m-2'>
       <li><img src={item.profile} className="h-11 rounded-full mx-3" /></li>
       <li className='text-white text-sm	font-semibold	 w-64	 mx-2'>{item.title}</li>
       <li><MdOutlineWatchLater color="white"  /></li>
     </ul>
    </div>
  )
}

export default Card