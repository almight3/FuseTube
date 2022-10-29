import React from 'react';
import {NavLink} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {logoutUser} from "../../store/authSlice";
function Navbar() {
  const {isAuthenticated} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const logoutHandle=()=>{
    dispatch(logoutUser())
  }
  return (
   <nav className="h-20 box-border p-3 sticky inset-0	bg-slate-900">
     <ul className='flex flex-row justify-around text-white'>
        <li className='font-bold text-2xl p-2 ml-9'>
            FuzeTime
        </li>

        <li className=''>
            <input type="text" placeholder='Search' className='p-1 px-3 my-3 text-black w-96  outline-none' />
        </li>
        <li className='p-4 font-semibold text-lg cursor-pointer'>
           {isAuthenticated ? <NavLink onClick={logoutHandle}>logOut</NavLink>: <NavLink to="/login">LogIn</NavLink> }
        </li>
     </ul>
   </nav>
  )
}

export default Navbar