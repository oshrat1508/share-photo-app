import React, { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUpload, AiOutlineDown } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import Likes from "./Likes";
import { likePost, update_post } from "../../../actions/posts";

export default function PostDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
 const navigate = useNavigate()
  const posts = useSelector((state) => state.posts);
  const users = useSelector((state) => state.authReducer.users);
  const clickedpost = posts.find((post) => post._id === id);
  const [commentPost, setComment] = useState({id:user.results._id ,comment:''});
 
  const handleComments = () => {
    dispatch(
      update_post(id,{ ...clickedpost, comments:[...clickedpost.comments , commentPost]})
    );
  };

  const filterd = posts.filter(post => post.tags.map(tag => tag === clickedpost?.tags[0] || clickedpost?.tags[1] || clickedpost?.tags[2]))
console.log(filterd);


  return (
    <>
      <div className="flex justify-center items-center text-black w-[100%] md:w-[60%] flex-col-reverse
       md:flex-row m-auto mt-10 border-black rounded-md ">
        <div className="w-[50%] mr-3">
          <div className="flex justify-between px-4">
            {" "}
            <span
              className="flex left-2 border-2 rounded-full p-1"
              disabled={!user?.results}
              onClick={() => {
                dispatch(likePost(clickedpost._id));
              }}
            >
              <Likes post={clickedpost} />
            </span>{" "}
            {/* <span className="flex">
              <AiOutlineUpload /> <FiMoreHorizontal />{" "}
            </span>{" "} */}
          </div>
          <div>{clickedpost?.url}</div>
          <h1 className="text-3xl font-semibold mt-6">
            {clickedpost?.title}
          </h1>
          <div className="mt-3">{clickedpost?.message} </div>
          <div>
            <span className=" mt-6 mb-2 font-bold text-xl  flex items-center">
              {" "}
              comments <AiOutlineDown className="mt-1" />
            </span>
            <div>{clickedpost?.comments?.slice(clickedpost?.comments.length-4).map((comment,key) =>(
              <div key={key} className="px-2 py-4 border-2 mb-1 rounded-md">
             <span className="flex ">  
             { users?.filter(user =>user._id === comment?.id).map(user => <div className="flex justify-center items-center flex-row-reverse">
             <div className="font-semibold ">{user.name}</div> 
                {user.profileImg ? (
                <img onClick={() => navigate(`/profile/${user._id}`)} className=" cursor-pointer bg-slate-200 w-10 h-10 text-center  rounded-full border-2  " src={user.profileImg} alt={user.name} />
              ) : (
                <div
                  onClick={() => navigate(`/profile/${user._id}`)}
                  className=" cursor-pointer bg-slate-200 w-9 h-9 text-center p-1 rounded-full border-2 border-black "
                >
                  {user.email[0].toUpperCase()}
                </div>
              )}
               </div>)}<span> </span></span>
              <span className="text-lg">{comment?.comment}</span> 
                
              </div>
            ))}</div>
            <input
              onChange={(e) => setComment({...commentPost , comment: e.target.value})}
              className="font-bold outline-none border-2 border-black w-[80%] p-2 rounded-full"
              type="text"
              placeholder="add comments"
            />
            <button
              onClick={handleComments}
              className="bg-[#851672] px-3 py-2 ml-2 rounded-full text-white "
            >
              send
            </button>
          </div>
        </div>
        <div className="w-[50%]">
          <img
            className="w-[100%] max-h-[70vh] sm:w-[80%] rounded-r-lg "
            src={clickedpost?.selectedFile}
            alt=""
          />{" "}
          
        </div>
      </div>
      <div className="text-center mt-10 font-extrabold">
        More content like this
        
                </div>
      <div></div>
    </>
  );
}
