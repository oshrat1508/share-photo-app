import React from "react";

import {
  AiOutlineHeart,
  AiFillDelete,
  AiFillHeart,
  AiOutlineUpload,
} from "react-icons/ai";




const user = JSON.parse(localStorage.getItem("profile"));
  
const Likes = ({post}) => {
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.results?.googleId || user?.results?._id)
      ) ? (
        <>
          <AiFillHeart className='mt-0.5' size={20} />
         { post.likes.length}
        </>
      ) : (
        <>
        
          <AiOutlineHeart size={20} className='mt-0.5' />
           {post.likes.length} 
        </>
      );
    }
    return (
      <>
        <AiOutlineHeart size={20} />
        &nbsp;
      </>
    );
  };

  export default Likes