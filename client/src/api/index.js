import axios from "axios";


const API = axios.create({baseUrl:"http://localhost:5000"})

API.interceptors.request.use((req)=>{
if(localStorage.getItem('profile')){
    req.headers.Authorization = `bearer ${JSON.parse(localStorage.getItem('profile')).token}`
}
return req
})

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id , updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const likePost = (id ) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (id ) => API.patch(`/posts/${id}/comments`);
export const deletePost = (id ) => API.delete(`/posts/${id}`);


export const singIn = (formData)=> API.post('/user/singin' , formData)
export const singUp = (formData)=> API.post('/user/singup' , formData)
export const updateUser = (email , updatedUser) => API.patch(`/user/${email}`, updatedUser);
export const fetchUsers = () => API.get('/user');
export const followUser = (id ) => API.patch(`/user/${id}/follow`);
