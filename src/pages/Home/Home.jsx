import {useState,useEffect} from 'react';
import Card from '../../component/Card/Card';
import Category from '../../component/Category/Category';
import {useDispatch,useSelector} from "react-redux";
import {getAllVideos} from "../../store/videoSlice";
import { Ring } from '@uiball/loaders';

const filterByCatgory = (data,category)=>{
  if(category=="All"){
    return data
  }
  let filter = data.filter((video)=>video.category === category)
  return filter
}

function Home() {
  const dispatch = useDispatch();
  const {data,error,status} = useSelector((state)=>state.video);
  const [category,setCategory] = useState("All");
  useEffect(()=>{
  dispatch(getAllVideos())
  },[dispatch])
  
  console.log(category)
  if(status==="error")
  return <h1 className='mx-auto my-10 text-white'>Error....</h1>
  return (
    <>
    <Category setCategory={setCategory} />
    {status ==="loading" ?  
    <div className='m-auto	mt-80 w-28'>
    <Ring 
      size={80}
      lineWeight={3}
      speed={2} 
      color="#26C281" 
    />
    </div>:
    <div className='flex flex-wrap justify-around mx-auto box-border w-10/12 ml-72 relative top-14'>
      {filterByCatgory(data,category).map((item)=>{
        return <Card item={item} />
      })}       
    </div>
    }
   </>
  )
}

export default Home