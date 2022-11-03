import {useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import {getUserAllHistory,clearUserHistory} from "../../store/historySlice";
import { Ring } from '@uiball/loaders';
import HistoryCard from '../../component/Card/HistoryCard/HistoryCard';
function History() {
  const dispatch = useDispatch();
  const {history,status} = useSelector((state)=>state.history);
  
  // fetching user history
  useEffect(() => {
  dispatch(getUserAllHistory()) 
  },[dispatch]);

  // clear user history
  const handleClick = ()=>{
    dispatch(clearUserHistory())
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
       </div> :
       <div className='flex flex-col box-border w-7/12	relative top-28 left-80 '>
          <div className='flex justify-around text-white m-2 '>
              <h2 className='text-xl font-semibold p-2'>Watch History</h2>
             <button className='px-4 font-semibold' onClick={handleClick}>Clear History</button>
          </div>
           {history?.map((video)=>{
           return <HistoryCard video={video}/>
        })}
       </div>
      }
    </>
  )
}

export default History