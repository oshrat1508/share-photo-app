import React, { useState, useEffect } from "react";
import Posts from "./components/Posts/Posts";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Form from "./components/Form/Form";
import { get_users } from "./actions/auth"; 
import { get_posts } from "./actions/posts"; 
import ProfilePage from "./components/profilePage/ProfilePage";
import EditProfile from "./components/profilePage/EditProfile";
import PostDetails from "./components/Posts/Post/PostDetails";

export default function App() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState(false);
  const [array , setArray] = useState([1,1,1]) 

  

  useEffect(() => {
    dispatch(get_posts());
  }, [currentId, dispatch]);

  useEffect(() => {
    dispatch((get_users()));
  }, [currentId, dispatch]);

  return (
    <BrowserRouter>
      <div>
        <Navbar setArray={setArray} array={array}  setSearch={setSearch} setShowForm={setShowForm} currentId={currentId} setCurrentId={setCurrentId}  showForm={showForm} />
        <Routes>
          <Route path="/" element={<Posts setShowForm={setShowForm} search={search} showForm={showForm} setCurrentId={setCurrentId} />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile/:id" element={<ProfilePage setShowForm={setShowForm}  showForm={showForm} setCurrentId={setCurrentId} />} />
          <Route path="/edit/:obj" element={<EditProfile setShowForm={setShowForm}  showForm={showForm} setCurrentId={setCurrentId}  />} />
          <Route path="/postDetails/:id" element={<PostDetails  />} />
          <Route
            path="/form"
            element={<Form currentId={currentId}  />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
