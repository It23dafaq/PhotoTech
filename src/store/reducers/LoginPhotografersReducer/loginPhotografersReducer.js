
import * as actionTypes from '../../actionTypes';
import { updateObject } from '../../utility';
const initialState = {
    isLogedInPhoto: false,
    photograferData:null,
    userName:"none",
    photograferID:null,
    loading:false,
    error:null
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
  console.log("Photografers login",action);
 localStorage.setItem('uniquePhotograferID', JSON.stringify(action.data._id));


    return updateObject( state, {
        PhotograferName: action.userName,
        photograferData: action.data,
        isLogedInPhoto:true,
        error: null,
        loading: false
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        sellerCode:null,
    });
};

const authLogout = (state, action) => {
//  localStorage.clear();
    return updateObject(state, { sellerCode: null, isLogedInPhoto: false,userName: null });
};

 const loginAuthPhotografersReducer = (state = initialState, action) => {
     switch(action.type){
       case actionTypes.AUTH_STARTPHOTO:return authStart(state,action);
       case actionTypes.AUTH_SUCCESSPHOTO: return authSuccess(state, action);
       case actionTypes.AUTH_FAILPHOTO: return authFail(state, action);
       case actionTypes.AUTH_LOGOUTPHOTO: return authLogout(state, action);
       default:
           return state;
     }
/*
    if(action.type === LOGIN){
        return {
            ...state,
            isLogedIn: action.result.data.isLogedIn,
            isAdmin: action.result.data.isAdmin,
            userName: action.result.data.userName,
        }
    }
    return state;
    */
};

export default loginAuthPhotografersReducer;
