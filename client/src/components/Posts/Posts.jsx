import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import PinterestGrid from "rc-pinterest-grid";

export default function Posts({ setCurrentId, setShowForm ,search }) {
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.authReducer);
  

  return (
    <div className="flex justify-center items-center m-0 p-0 width={'100%'}">
      {!posts.length ? (
        <TailSpin
          height="80"
          width="80"
          radius="9"
          color="black"
          ariaLabel="loading"
          wrapperStyle
        />
      ) : (
        <PinterestGrid
        
          columns={6} // how many columns in one row
          columnWidth={240} // width of each block
          gutterWidth={10} // horizontal gutter between each block
          gutterHeight={10}
          responsive={true}
        >
          {posts.filter((post)=>{
    if(search== ''){
      return post
    }else if (post.title.toLowerCase().includes(search.toLowerCase())) {
      return post
    }
  }).map((post, i) => (
            <div key={i}>
              <Post className='bg-black'
                post={post}
                setShowForm={setShowForm}
                setCurrentId={setCurrentId}
              />
            </div>
          ))}
        </PinterestGrid>
      )}
    </div>
  );
}
