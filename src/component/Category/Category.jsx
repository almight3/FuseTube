import React from 'react'
import "./Category.css"
const categories = ["All","Gaming","Freestyle Rap","Hip Hope","Anime","Podcast" ]
function Category() {
  return (
    <div className='flex ml-72 p-3 mb-6 bg-slate-800 opacity-95	 category-border sticky top-20'>
        {
            categories.map((category)=><li className='text-white bg-slate-900 mx-8 list-none  px-3 py-1 rounded-full'>{category}</li>)
        }
    </div>
  )
}

export default Category