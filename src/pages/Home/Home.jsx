import {useState,useEffect} from 'react';
import Card from '../../component/Card/Card';
import Category from '../../component/Category/Category';
import {useDispatch,useSelector} from "react-redux";
import {getAllVideos} from "../../store/videoSlice";
import { Ring } from '@uiball/loaders';
import VideoNotFound from '../../component/VideoNotFound/VideoNotFound';
import { clearSearchQuery } from '../../store/videoSlice';

function Home() {
  const dispatch = useDispatch();
  const {data,status,searchQuery} = useSelector((state)=>state.video);
  const [category,setCategory] = useState("All");
  // const [video,setVideo] = useState([]);
  let video = data;
  
  useEffect(()=>{
  dispatch(getAllVideos())
  },[dispatch])

  if(category!=="All"){
     video = data.filter(d=>d.category===category)
   }
    if(searchQuery!==""){
     video = data.filter(d=>d.title.toLowerCase().includes(searchQuery.toLowerCase()))
   }


  if(status === "error")
  return <h1 className='mx-auto my-10 text-white'>Error....</h1>
  return (
    <>
    <Category setCategory={setCategory} clearSearch={ clearSearchQuery } dispatch={dispatch} />
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
      {
        video.length === 0 ? <VideoNotFound />: video.map(item=> <Card key={item._id} item={item} />)
      }       
    </div>
    }
   </>
  )
}

export default Home