import React from 'react';
import {NavLink} from "react-router-dom";

function Navbar() {
  return (
   <nav className="h-20 box-border p-3 sticky inset-0	bg-slate-900">
     <ul className='flex flex-row justify-around text-white'>
        <li className='font-bold text-2xl p-2 ml-9'>
            FuseTime
        </li>

        <li className=''>
            <input type="text" placeholder='Search' className='p-1 px-3 my-3 text-black w-96  outline-none' />
        </li>
        <li className='p-4 font-semibold text-lg cursor-pointer'>
           <NavLink to="/login">Login</NavLink> 
        </li>
     </ul>
   </nav>
  )
}

export default Navbar