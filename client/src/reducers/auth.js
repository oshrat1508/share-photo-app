const authReducer = (state = { authData: null, users:null }, action) => {
  switch (action.type) {
     case "FETCH_USERS":
      return ({...state, users: action.payload});
    case "AUTH":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };

    case "LOGOUT":
      localStorage.clear();
    console.log( state);

    case "UPDATEFOLLOW":
      return  state.users?.map((user)=> user?._id === action.data?._id ? action.data : user)

      
    default:        

      return state;
  }
};

export default authReducer;
