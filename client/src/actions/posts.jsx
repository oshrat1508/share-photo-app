import * as api from '../api'


export const get_posts = ()=> async(dispatch)=>{
  try{
const {data} = await api.fetchPosts()
    dispatch({type:'FETCH_ALL', payload: data})
  } catch(e){
 console.log(e.message);
  }
}

export const create_post = (post)=> async(dispatch)=>{
  try{
    
const {data} = await api.createPost(post);
console.log(data ,post ,"postttttttttt");
dispatch({type :'CREATE' , payload: data})
  } catch(e){
    console.log(e.message);
  }
}

export const update_post = (id , post)  => async(dispatch)=> {
try{
const {data} = await api.updatePost(id , post)
dispatch({type :'UPDATE' , payload: data})

}catch(e){
console.log(e);
}
}

export const delete_post = ( id )  => async(dispatch)=> {
  try{
 await api.deletePost(id )

  dispatch({type :'DELETE' , payload: id})
  
  }catch(e){
  console.log(e);
  }
  }

  export const likePost = (id )  => async(dispatch)=> {
    try{
      const {data} = await api.likePost(id )
  
    dispatch({type :'UPDATE' , payload: data})
    
    }catch(e){
    console.log(e);
    }}

  
