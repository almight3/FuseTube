import {useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {loginUser,clearError} from "../../store/authSlice";
function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {status,error} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  

  useEffect(()=>{
    const timer = setTimeout(()=>{
    dispatch(clearError); 
    },2000)  
    
    return ()=>clearTimeout(timer);
    },[dispatch,error])

  const handleSubmit = (e)=>{
   e.preventDefault();
   dispatch(loginUser({email,password}));
  }

  

  return (
    <>
      {status === "loading" ? <p>Loading...</p> :
      <form className='w-96  bg-slate-900 mx-auto relative	top-60	flex flex-col shadow rounded' onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mt-7  mx-auto text-white">Login</h1>
          <label className='ml-9 m-3 text-white'>Email</label>
          <input type="email" placeholder='Email' className='p-3 w-10/12 mx-auto bg-slate-800 text-white' required onChange={(e)=>setEmail(e.target.value)} />
          <label className='ml-9 m-3 text-white'>Password</label>
          <input type="password" placeholder="password" className='p-3 w-10/12 mx-auto bg-slate-800 text-white' required onChange={(e)=>setPassword(e.target.value)} />
          <button className='p-3 my-6 mb-0 w-36  rounded mx-auto text-white bg-slate-800 drop-shadow font-bold' type='submit'>Login</button>
          <p className='text-white text-center m-5 text-sm'>Dont have accout?<Link to="/signup" className='font-semibold' >signup</Link></p>
       </form> 
      }
    </>
  )
}

export default Login