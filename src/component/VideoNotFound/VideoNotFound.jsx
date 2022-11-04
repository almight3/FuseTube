import React from 'react'
import NotFound from "../../Asset/NotFound.svg"
function VideoNotFound() {
  return (
    <div>
        
        <img src={NotFound} alt="video not found" className='w-96 mx-auto mt-24'/>
        <p className='text-white m-3 text-3xl font-semibold ml-12'>No Video Found</p>
        
    </div>
  )
}

export default VideoNotFound