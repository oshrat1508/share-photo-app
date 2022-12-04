import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { useNavigate ,useParams } from "react-router-dom";
import { update_user ,singin } from "../../actions/auth";
import { fetchUsers } from "../../api";
export default function EditProfile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const {obj} = useParams()
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState({
    firstName: "",
    lastName: "",
    description: "",
    profileImg: "",
  });

  const handleClick = async() => {
    update_user(user.results.email,editUser );
    const {data} =await fetchUsers()
    navigate(`/profile/${user.results._id}`);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <h1 className="font-bold text-4xl">Public profile</h1>
      <div>People visiting your profile will see the following information</div>
      <div className="flex mt-5 flex-col p-3 ">
        <h1> picture</h1>
        <div className="flex items-center mt-3 ">
          <div className="mr-3 bg-slate-200 w-20 h-20 text-6xl  rounded-full border-black flex justify-center ">
            {editUser.profileImg ? (
              <img className="w-20 rounded-full " src={editUser.profileImg} />
            ) : (
              <span>{user.results.email[0]}</span>
            )}
          </div>
          <span className=" rounded border-4 font-bold w-44 text-center px-1 py-2">
            change img
            <div className="text-xs">
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setEditUser({ ...editUser, profileImg: base64 })
                }
              />{" "}
            </div>
          </span>
        </div>
        <div className="flex flex-wrap">
          <div className="flex flex-col m-4">
            <label className="relative w-20 top-3 bg-white" htmlFor="">
              First name
            </label>
            <input
              onChange={(e) =>
                setEditUser({ ...editUser, firstName: e.target.value })
              }
              className="p-2 border-2 outline-none border-slate-600"
              type="text"
            />
          </div>
          <div className="flex flex-col m-4">
            <label className="relative w-20 top-3 bg-white" htmlFor="">
              Last name
            </label>
            <input
              defaultValue={obj.name}

              onChange={(e) =>
                setEditUser({ ...editUser, lastName: e.target.value })
              }
              className="p-2 border-2 outline-none border-slate-600"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col w-[94%]  h-40 m-4">
          <label className="relative w-20 top-3 bg-white" htmlFor="">
            Description
          </label>
          <textarea
            onChange={(e) =>
              setEditUser({ ...editUser, description: e.target.value })
            }
            className="p-2 border-2 h-36 outline-none border-slate-600"
            type="text"
          />
        </div>
      </div>
      <button onClick={ ()=>{handleClick()

      }} >
        save
      </button>
    </div>
  );
}
