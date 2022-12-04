import {useEffect} from 'react';
import  {useSelector,useDispatch} from "react-redux";
import {removeFromUserLiked,getUserLikedVideos} from "../../store/likeSlice"
import { Ring } from '@uiball/loaders';
import AdvanceCard from '../../component/Card/AdvanceCard/AdvanceCard';
import VideoNotFound from '../../component/VideoNotFound/VideoNotFound';

function Liked() {
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.user);

  const {status,like} = useSelector(state=>state.like);
  useEffect(()=>{
    if(like.length === 0){
      dispatch(getUserLikedVideos(token))
    }
  },[dispatch,token,like])

  return (
    <>
    {
      status ==="loading"  ?
      <div className='m-auto absolute inset-x-56	mt-80 w-28'>
        <Ring 
          size={80}
          lineWeight={3}
          speed={2} 
          color="#26C281" 
        />
      </div> : like.length === 0 ? <div className='flex  box-border mx-auto w-96	relative '><VideoNotFound /></div> :
      <div className='flex flex-col box-border w-7/12	relative top-28 left-80 '>
            <h2 className='text-xl text-white mx-8 font-semibold p-2'>Liked</h2>
      
         {like?.map((video)=>{
         return <AdvanceCard video={video} dispatchFunc={removeFromUserLiked} />
      })}
     </div>
    }
  </>
  )
}

export default Liked