import React from 'react';
import Card from '../../component/Card/Card';
import Category from '../../component/Category/Category';
function Home() {
  return (
    <>
    <Category />
    <div className='flex flex-wrap justify-center box-border w-10/12 ml-72	'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
    </div>
    </>
  )
}

export default Home