import {useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import {getUserAllHistory,clearUserHistory} from "../../store/historySlice";
import { Ring } from '@uiball/loaders';
import HistoryCard from '../../component/Card/HistoryCard/HistoryCard';
import VideoNotFound from '../../component/VideoNotFound/VideoNotFound';
function History() {
  const dispatch = useDispatch();
  const {history,status} = useSelector((state)=>state.history);
  const {token} = useSelector(state=>state.user);
   
  function fetchUserHistory(dispatch,token){
    dispatch(getUserAllHistory(token))
  }
  // fetching user history
  useEffect(() => {
    fetchUserHistory(dispatch,token)
  },[dispatch,token]);

  // clear user history
  const handleClick = ()=>{
    dispatch(clearUserHistory(token))
  }

  
  if(status==="error")
  return <h1 className='mx-auto my-10 text-white'>Error....</h1>
  
  return (
    <>
      {
        status ==="loading"  ?
        <div className='m-auto absolute inset-x-56		mt-80 w-28'>
          <Ring 
            size={80}
            lineWeight={3}
            speed={2} 
            color="#26C281" 
          />
       </div> : history.length === 0 ? 
       <div className='flex  box-border mx-auto w-96	relative '><VideoNotFound /></div>:
       <div className='flex flex-col box-border w-7/12	relative top-28 left-80 '>
          <div className='flex justify-around text-white m-2 '>
              <h2 className='text-xl font-semibold p-2'>Watch History</h2>
             <button className='px-4 font-semibold' onClick={handleClick} >Clear History</button>
          </div>
           {history?.map((video)=>{
           return <HistoryCard video={video} token={token} />
        })}
       </div>
      }
    </>
  )
}

export default History