import React from "react";
import { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {singup , singin} from '../../actions/auth'


export default function Auth() {

  const [showPassword, setShowPassword] = useState(false);
  const [repeatShowPassword, setRepeatShowPassword] = useState(false);
  const [isSingUp, setisSingUp] = useState(false);
  const [formData, setFormData] = useState( {firstName:'',lastName:'',email:'', password:'', confirmPassword:'' });

 const dispatch = useDispatch()
 const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

if(isSingUp){
  try{
    dispatch(singup(formData , navigate))
  }catch(e){
    console.log({messege:e});
  }
}else{
  dispatch(singin(formData , navigate))
}
  };

  const handleChange = (e) => {
  setFormData({...formData ,[ e.target.name]:e.target.value})
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleRepeatShowPassword = () => {
    setRepeatShowPassword(!repeatShowPassword);
  };
  const switchMode = () => {
    setisSingUp(!isSingUp);
  };

  return (
    <div className='h-full'>
      
      <div style={{background:'url("https://images.ctfassets.net/h67z7i6sbjau/3ii4Es78uWW7YWgWcyKE0m/e4d22d08b25553001462de864fb863b1/Pinterest-for-Business.jpg")',backgroundColor:' #cccccc',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'}} className='w-[90vw] h-[80vh] m-auto rounded-xl flex justify-center items-center' >
       
        <form className="bg-white p-8 flex flex-col " action="" onSubmit={handleSubmit}>
         <h1 className="text-3xl text-center mb-5">{isSingUp ? "Sing Up " : "Sing In"}</h1> 
          {isSingUp && (
            <>
              <label className="relative top-3 bg-white w-24" htmlFor="">First Name</label>
              <input className="p-2 border-2 outline-none"
                onChange={handleChange}
                type="text"
                name="firstName"
              />{" "}
              
              <label className="relative top-3 bg-white w-24" htmlFor="">Last Name</label>
              <input className="p-2 border-2 outline-none"
                onChange={handleChange}
                type="text"
                name="lastName"
              />{" "}
              
            </>
          )}
          <label className="relative top-3 bg-white w-24" htmlFor="">Email Adress</label>
          <input className="p-2 border-2 outline-none"
            onChange={handleChange}
            type="email"
            name="email"
          />{" "}
          
          <label className="relative top-3 bg-white w-24" htmlFor="">Password</label>
          <input className="p-2 border-2 outline-none"
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            name="password"
          />
          <AiFillLock className="relative bottom-7  left-[90%]" onClick={handleShowPassword} />
          {isSingUp && (
            <>
              <label className="relative top-3 bg-white w-32" htmlFor="">confirm Password</label>
              <input className="p-2 border-2 outline-none"
                onChange={handleChange}
                type={repeatShowPassword ? "text" : "password"}
                name="confirmPassword"
              />
              <AiFillLock className="relative bottom-7 left-[90%] " onClick={handleRepeatShowPassword} /> 
            </>
          )}
          <button className=" border-2 text-white bg-[#851672] px-4 py-2  rounded-md font-bold" type="submit"> {isSingUp ? "Sing Up" : "Sing In"}</button>
          <div>
            <button type="button" className="text-sm"  onClick={switchMode}>
              {" "}
              {isSingUp
                ? "alredy have an account? click to sing in "
                : "dont have an account ? click to sing up "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
