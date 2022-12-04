import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import {
  AiOutlineSearch,
  AiFillPlusCircle,
  AiOutlineDown,
  AiFillHome,
  AiFillBell,
} from "react-icons/ai";
import Logo from "../Img/LOGO.png";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";

export default function Navbar({setShowForm ,showForm , currentId ,setSearch , setCurrentId,setArray ,array}) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div className="flex items-center w-[100%] md:static fixed bottom-0 z-20 justify-between m-auto p-3 bg-white ">
      <div>
        {user ? (
          <div className="flex items-center justify-center  ">
          <button
            onClick={() =>logOut()}
            className=" border-4 text-[#4d1644] border-[#851672] px-4 py-2  rounded-full font-bold"
          >
            Log out
          </button>
            
            
            <div className="ml-2 flex flex-col items-center">
              {user.results.profileImg ? (
                <img onClick={() => navigate(`/profile/${user.results._id}`)} className=" cursor-pointer bg-slate-200 w-10 h-10 text-center  rounded-full border-2  " src={user.results.profileImg} alt={user.results.name} />
              ) : (
                <div
                  onClick={() => navigate(`/profile/${user.results._id}`)}
                  className=" cursor-pointer bg-slate-200 w-9 h-9 text-center p-1 rounded-full border-2 border-black "
                >
                  { user.results.email[0].toUpperCase()}
                </div>
              )}
            </div>
{/*             
            <div>
              <span className="px-1 text-white text-[9px] font-bold  rounded-full absolute left-48 bg-[#851672]">{array.length ===0 ?null :array.length}</span>
              <AiFillBell onClick={()=>{
                setArray([])
              }}  size={30} className="text-black text-2xl ml-3" />
            </div> */}
          </div>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className=" border-2 text-white bg-[#851672] px-4 py-2  rounded-md font-bold"
          >
            Sing In
          </button>
        )}
      </div>
      <AiOutlineSearch size={30} onClick={()=> setIsOpen(!isOpen)} className="mr-2 text-xl mt-1  flex md:hidden" />
               {isOpen?(
                <div className="absolute right-0 top-0 justify-center items-center h-20 left-0 flex flex-row  w-100% bg-white">
                  <span className="w-[10%] font-extrabold" onClick={()=>setIsOpen(false)}>X</span>
              <input 
              onChange={(e)=>setSearch(e.target.value)}
                className="outline-none w-[80%] h-[50%] p-1 bg-transparent  border-2 border-[#851672]  "
                placeholder="search"
                type="text"
              /></div>
            ):null

            }
      <div className="md:flex hidden items-center border-2 px-2 py-1 w-[70%] rounded-2xl bg-slate-100">
        <AiOutlineSearch  className="mr-2 text-xl mt-1" />
        <input 
        onChange={(e)=>setSearch(e.target.value)}
          className="outline-none w-[98%] bg-transparent"
          placeholder="search"
          type="text"
        />
      </div>
      <div>
        <div
          onClick={()=>{setShowForm(!showForm)
            setCurrentId(false) }}
          className="flex items-center cursor-pointer  border-2 text-white bg-[#69135B]  px-4 py-2 rounded-md font-bold"
        >
          pic <AiFillPlusCircle className="mt-1 ml-1" />
        </div>
      </div>
      <AiFillHome onClick={() => {navigate("/")
            setShowForm(!showForm)}

    } size={30} className="flex md:hidden"/>
      <div
        style={{ boxShadow: "0 3px 10px rgba(204,42,278,0.95" }}
        onClick={() => {navigate("/")
      }}
        className="hidden md:flex cursor-pointer border-[#69135B] font-medium px-2 py-2 rounded-full"
      >
        Home 
      </div>
      <div className=" text-4xl font-bold w-14 ">
        <img className="rounded-full" src={Logo} alt="LOGO" />
      </div>

      {showForm &&
      <Form currentId={currentId} setShowForm={setShowForm}/>
      }
    </div>
  );
}
