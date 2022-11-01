import {useState,useEffect} from 'react';
import Card from '../../component/Card/Card';
import Category from '../../component/Category/Category';
import {useDispatch,useSelector} from "react-redux";
import {getAllVideos} from "../../store/videoSlice";
import { Ring } from '@uiball/loaders'


function Home() {
  const dispatch = useDispatch();
  const {data,error,status} = useSelector((state)=>state.video);
  useEffect(()=>{
  dispatch(getAllVideos())
  },[dispatch])
  
  if(status==="error")
  return <h1 className='mx-auto my-10 text-white'>Error....</h1>
  return (
    <>
    <Category />
    {status ==="loading" ?  
    <div className='m-auto	mt-80 w-28'>
    <Ring 
      size={80}
      lineWeight={3}
      speed={2} 
      color="#26C281" 
    />
    </div>:
    <div className='flex flex-wrap justify-around box-border w-10/12 ml-72 relative top-14'>
      {data.map((item)=>{
        return <Card item={item} />
      })}       
    </div>
    }
   </>
  )
}

export default Home