import {useState} from 'react';
import {NavLink} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {logoutUser} from "../../store/authSlice";
import {searchByFilter} from "../../store/videoSlice";
import {MdSearch} from "react-icons/md";
function Navbar() {
  const {isAuthenticated} = useSelector((state)=>state.user);
  const [search,setSearch] = useState("");
  const dispatch = useDispatch();
  const logoutHandle=()=>{
    dispatch(logoutUser())
  }

  const onSearchFilter = ()=>{
    dispatch(searchByFilter(search))
    setSearch("")  
  }


  return (
   <nav className="h-20 p-3 box-border fixed	inset-0	bg-slate-900 z-10	">
     <ul className='flex flex-row justify-around text-white'>
        <li className='font-bold text-2xl p-2 ml-9'>
            FuzeTube
        </li>

        <li className='flex'>
            <input type="text" placeholder='Search' value={search} className='py-1 h-9 px-3 my-2 text-black w-96  outline-none' onChange={(e)=>{setSearch(e.target.value)}}/>
            <div className='bg-slate-700 px-3 py-1 h-9 my-2'><button onClick={onSearchFilter}  ><MdSearch  size={30} /></button></div>
        </li>
        <li className='p-4 font-semibold text-lg cursor-pointer'>
           {isAuthenticated ? <NavLink onClick={logoutHandle}>logOut</NavLink>: <NavLink to="/login">LogIn</NavLink> }
        </li>
     </ul>
   </nav>
  )
}

export default Navbar