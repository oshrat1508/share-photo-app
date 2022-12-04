import React from 'react'
import Posts from '../Posts/Posts'
import { useDispatch } from 'react-redux'
import { useState ,useEffect } from 'react'
// import { get_posts } from '../../actions/posts'

export default function Home() {
  const dispatch = useDispatch()


  // useEffect(()=>{
  // dispatch(get_posts());
  // },[ currentId , dispatch])
  
 
  return (
    <div>
       {/* <Posts setCurrentId ={setCurrentId}/> */}
    </div>
  )
}
