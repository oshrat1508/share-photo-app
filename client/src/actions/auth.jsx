import * as api from '../api'

export const get_users = ()=> async(dispatch)=>{
  try{
const {data} = await api.fetchUsers()
console.log(data);
    dispatch({type:'FETCH_USERS', payload: data})
  } catch(e){
 console.log(e.message);
  }
}

export const singin = (formData , navigate)=> async(dispatch)=>{
    try{
   const {data} = await api.singIn(formData)

   dispatch({type:'AUTH' ,  data})

    navigate('/')

    } catch(e){
   console.log(e.message);
    }
  }
  
  export const singup = (formData , navigate)=> async(dispatch)=>{
    try{
      const {data} = await api.singUp(formData)
      dispatch({type:'AUTH' ,  data})
    navigate('/')
  
    } catch(e){
   console.log(e.message);
    }
  }

  export const update_user = async(email , post ,id)=> {
    try{
    await api.updateUser(email ,{name:`${post.firstName} ${post.lastName} `, profileImg:post.profileImg ,description:post.description})
    
    }catch(e){
    console.log(e);
    }
    }

    export const follow_user = (id)  => async(dispatch)=> {
      try{
        const {data} = await api.followUser(id)
        console.log(data);
      dispatch({type :'UPDATEFOLLOW' , data})
      
      }catch(e){
      console.log(e);
      }}


    
  