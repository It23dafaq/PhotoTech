import axios from 'axios';
import * as actionTypes from '../../actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_STARTPHOTO
    };
};

export const authSuccess = (username, data) => {
    console.log("ΔατΑ",data);
    console.log("username",username);

  //  localStorage.setItem('officeLogedin', JSON.stringify(true));
    localStorage.setItem('userName', JSON.stringify(username));
  //  localStorage.setItem('sellerID', JSON.stringify(sellerCode));
  //  localStorage.setItem('photograferID', JSON.stringify(photograferCode));


    return {
        type: actionTypes.AUTH_SUCCESSPHOTO,
        userName: username,
        data: data.user
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAILPHOTO,
        error: error
    };
};
export const logout = () => {
  console.log("inside logout");
  localStorage.clear();
    return {
        type: actionTypes.AUTH_LOGOUTPHOTO
    };
};
export const saveResult = (res) =>{
  console.log(res);
  return{
     type: actionTypes.AUTH_SUCCESSPHOTO,
     result: res
   };
}

export const login = (formdata) => {
  //photografername
  console.log("here data",formdata);
 return dispatch => {
    dispatch(authStart());
   //todo async actions
   let url = `http://167.172.109.106/api/auth/Photografoi/login`;
   //lo
  axios.post(url,formdata).
  then(res => {
    if(res.data.error){
        dispatch(authFail(res.data.error));
    }else{
    dispatch(authSuccess(res.data.user.photografername,res.data));
  }
    // dispatch(authSuccess(res));
  //  dispatch(saveResult(res));

  }).catch(err => {
                dispatch(authFail(err));
            });


 }

};
