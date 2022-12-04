import React from "react";
import { useState, useEffect } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { create_post, update_post } from "../../actions/posts";
import { AiFillFileImage, AiOutlineClose } from "react-icons/ai";

export default function Form({ currentId, setShowForm, setCurrentId }) {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts?.find((p) => p._id === currentId) : null
  );
  console.log(postData);

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        update_post(currentId, { ...postData, name: user?.results?.name }));
    } else {
      dispatch(create_post(postData));
    }
    
      setShowForm(false)
      setCurrentId(null)
    clearf(e);
  };
      console.log(postData , 'data');

  const clearf = (e) => {
    e.target.reset();
  };

  if (!user?.results?.name) {
    return (
      <div className="absolute top-20 z-20 bg-white">
      <div  >please sing in to create your own Pic and like others</div>
   </div> );
  }


  return (
    <div className="md:bg-black h-[100vh] w-[100vw] fixed top-20 z-20 md:bg-opacity-80 left-0">
      <div className="flex justify-center flex-col md:flex-row items-center text-center  h-[100%] w-[100%] bg-white rounded-lg md:h-[80%] md:w-[80%] top-16  fixed md:top-28 md:left-[10%]  z-20 ">
        <AiOutlineClose
          className="cursor-pointer relative bottom-[45%] left-[95%]    "
          onClick={() => setShowForm(false)}
        />
        <form className="w-[100%]" autoComplete="off" noValidate onSubmit={(e)=>{handleSubmit(e)}}
required>
          <div className="flex w-[100%] flex-col-reverse md:flex-row justify-around">
            <div>
              {" "}
              <h1 className="text-4xl  font-medium mb-7">
                {currentId ? "Editing" : "Creating"} a pic
              </h1>
              <input
              
               defaultValue={postData.title}
                className="p-1 w-[50%] md:w-[90%] border-2 m-2 "
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
                type="text"
                placeholder="Title"
                required="required"/>
              <br />
              <input
              
               defaultValue={postData.message}
                className="p-1 w-[50%] md:w-[90%] border-2 m-2"
                onChange={(e) =>
                  setPostData({ ...postData, message: e.target.value })
                }
                type="text"
                placeholder="Description"
                name=""
                id=""
              required/>
              <br />
              <input
             
              defaultValue={postData.tags}
                className="p-1 w-[50%] md:w-[90%] border-2  m-2"
                onChange={(e) =>
                  setPostData({ ...postData, tags: e.target.value.split(",") })
                }
                type="text"
                placeholder="Tags"
                name=""
                id="" required
              />
              <br />
              <br />
              <button
              onclick={(e)=>{handleSubmit(e)
              }}
                className="my-3 border-2 text-white bg-[#851672] px-4 py-2 w-[60%] md:w-[100%] rounded-md font-bold"
              >
                SUBMIT
              </button>
              <br />
             
            </div>
            <div
              style={{ boxShadow: "0 2px 10px 0.2px" }}
              className="border-2 md:self-auto self-center w-[50%]  md:w-[30%] "
            >
              <div className="flex justify-center items-center w-[100%] h-[100%] mb-2">
                {postData.selectedFile ? (
                  <img
                    className="w-[240px] max-h-[60%]  rounded-md"
                    src={postData?.selectedFile}
                    alt=""
                  />
                ) : (
                  <AiFillFileImage size={50} />
                )}
              </div>
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, selectedFile: base64 })
                }
              />{" "}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
