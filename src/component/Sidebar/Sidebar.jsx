import React from 'react';
import "./Sidebar.css";
import {NavLink} from "react-router-dom";
function Sidebar() {
  const active = "p-3 w-11/12 mx-auto	text-center text-black bg-white";
  const inactive = "p-3 w-11/12 mx-auto	text-center  hover:text-black hover:bg-white";
  return (
    <div className='w-72 sidebar-height fixed  bg-slate-900'>
       <div className='flex flex-col  text-xl text-white font-semibold'>
          <NavLink to="/" className={({isActive})=> isActive ? active : inactive} >Home</NavLink>
          <NavLink to="/liked" className={({isActive})=> isActive ? active : inactive}>Liked</NavLink> 
          <NavLink to="/watchlater" className={({isActive})=> isActive ? active : inactive}>Watch Later</NavLink> 
          <NavLink to="/history" className={({isActive})=> isActive ? active : inactive}>History</NavLink>   
          <NavLink to="/playlist" className={({isActive})=> isActive ? active : inactive}>Playlist</NavLink>
       </div>
    </div>
  )
}

export default Sidebar