import {useEffect} from 'react';
import  {useSelector,useDispatch} from "react-redux";
import {getUserWatchlater,removeWatchLater} from "../../store/watchLaterSlice";
import { Ring } from '@uiball/loaders';
import AdvanceCard from '../../component/Card/AdvanceCard/AdvanceCard';
import VideoNotFound from '../../component/VideoNotFound/VideoNotFound';
function Watchlater() {
  const {status,watchLater} = useSelector(state=>state.watchLater);
  const dispatch = useDispatch();
  
  useEffect(()=>{
  dispatch(getUserWatchlater())
  },[dispatch])

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
      </div> : watchLater.length === 0 ? 
      <div className='flex  box-border mx-auto w-96	relative '><VideoNotFound /></div>: 
      <div className='flex flex-col box-border w-7/12	relative top-28 left-80 '>
            <h2 className='text-xl text-white mx-8 font-semibold p-2'>Watchlater</h2>
      
         {watchLater?.map((video)=>{
         return <AdvanceCard video={video} dispatchFunc={removeWatchLater} />
      })}
     </div>
    }
  </>
  )
}

export default Watchlater