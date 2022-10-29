import {useState,useEffect} from 'react';
import { useNavigate,Link } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {signupUser,clearError} from "../../store/authSlice";
function Signup() {
  const [username,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {status,error} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(()=>{
  const timer = setTimeout(()=>{
  dispatch(clearError); 
  },2000)  
  
  return ()=>clearTimeout(timer);
  },[dispatch,error])


  const handleSubmit = (e)=>{
   e.preventDefault();
   dispatch(signupUser({email,username,password,navigate}));
  };
  
  return (
    <>
    {
      status === "loading" ? <p>Loading</p> : 
      <form className='w-96  bg-slate-900 mx-auto my-40 flex flex-col shadow rounded' onSubmit={handleSubmit}>
       <h1 className="text-2xl font-bold mt-7  mx-auto text-white">Signup</h1>
       <label className='ml-9 m-3 text-white'>Username</label>
       <input type="text" placeholder='Username' className='p-3 w-10/12 mx-auto bg-slate-800 text-white'
       onChange={(e)=>setUserName(e.target.value)} required/>
       <label className='ml-9 m-3 text-white'>Email</label>
       <input type="email" placeholder="Email" className='p-3 w-10/12 mx-auto bg-slate-800 text-white' 
       onChange={(e)=>setEmail(e.target.value)} required/>
       <label className='ml-9 m-3 text-white'>Password</label>
       <input type="password" placeholder="Password" className='p-3 w-10/12 mx-auto bg-slate-800 text-white' 
        onChange={(e)=>setPassword(e.target.value)}  required />
       <button className='p-3 my-6 mb-0 w-36  rounded mx-auto text-white bg-slate-800 drop-shadow font-bold' type='submit' >Signup</button>
       <p className='text-white text-center m-5 text-sm'>Already signup?<Link to="/login" className='font-semibold' >Login</Link></p>
    </form> 
    }
   </>
  )
}

export default Signup