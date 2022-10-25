import React from 'react';
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
       <form className='w-96  bg-slate-900 mx-auto my-40 flex flex-col shadow rounded'>
          <h1 className="text-2xl font-bold mt-7  mx-auto text-white">Login</h1>
          <label className='ml-9 m-3 text-white'>Email</label>
          <input type="email" placeholder='Email' className='p-3 w-10/12 mx-auto bg-slate-800 text-white' required />
          <label className='ml-9 m-3 text-white'>Password</label>
          <input type="password" placeholder="password" className='p-3 w-10/12 mx-auto bg-slate-800 text-white' required/>
          <button className='p-3 my-6 mb-0 w-36  rounded mx-auto text-white bg-slate-800 drop-shadow font-bold'>Login</button>
          <p className='text-white text-center m-5 text-sm'>Dont have accout?<Link to="/signup" className='font-semibold' >signup</Link></p>
       </form> 
    </>
  )
}

export default Login