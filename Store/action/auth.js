// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GOOGLE_KEY } from "../../keys";

export const AUTHENTIC = "AUTHENTIC";
export const LOGOUT = "LOGOUT";

let timer;

//these token and uerid get from startup
//we need to log the user in when we found everthing so we send token and userid here then in reducer we update token and useid
export const authentic = (token, userId, expirydate) => {
  return (dispatch) => {
    dispatch(setLoggerTimeout(expirydate));
    dispatch({ type: AUTHENTIC, token: token, userId: userId });
  };
};

export const signUpp = (email, password) => {
  //return dispatch we use when we wnat to send http request or there is promise fuction under

  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${GOOGLE_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      let message = "something went wrong";
      const errorlogin = await response.json();
      const errorMsg = errorlogin.error.message;

      if (errorMsg === "EMAIL_EXISTS") {
        message = "email already exit";
      } else if (errorMsg === "OPERATION_NOT_ALLOWED") {
        message = "operation not valid valid";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log("res", resData);

    // dispatch({
    //     type: SIGNUP,
    //     token: resData.idToken,
    //     userId: resData.localId
    // })

    //we have combine it so these token and id will go to authentic then it will sendto reducer to update id and token above dipatch will also work

    dispatch(
      authentic(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );

    //we need to know how much token is valid because it expire so
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    ); //to calculaye date /timeof expire from the day login
    saveData(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${GOOGLE_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      let message = "something went wrong";
      const errorlogin = await response.json();
      const errorMsg = errorlogin.error.message;

      if (errorMsg === "EMAIL_NOT_FOUND") {
        message = "email not found";
      } else if (errorMsg === "INVALID_PASSWORD") {
        message = "wrong password";
      }
      throw new Error(message);
    }

    const resData = await response.json();

    // dispatch({
    //     type: LOGIN,
    //     token: resData.idToken,
    //     userId: resData.localId
    // })

    //we have combine it so these token and id will go to authentic then it will sendto reducer to update id and token above dipatch will also work

    dispatch(
      authentic(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );

    //we need to know how much token is valid because it expire so
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    ); //to calculaye date /timeof expire from the day login
    saveData(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  //here not use use return dispatch because we are not interestee in the result of AsyncStorage
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return {
    type: LOGOUT,
  };
};

//clear Timeout is a js function which clear time so we have user here bychance when we manuaaly logout so it will clear time of expiration date
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

//when expirationtime comes then the setTimeout will work
const setLoggerTimeout = (expirationtime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationtime);
  };
};

export const saveData = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  ); //item which store has to be a key and string
}; //after these we have to check wether we have user id token or not so we will go to startupscreen

//first we signup then token and userid will create and along with that it will store using async storage then in startup screen whenvever we refresh page aur try to open app again then
//it will check for userData which iskey in asyncstorage and check whether token and user id is store and then login
//if everything right then we dispatch as authentic because there  is only token and userid is save in storage
//we need to log the user in when we found everthing so we send token and userid here then in reducer we update token and useid.....
//along with  that we have combine signup and login so we are dispatching as authenticate which is doing same work over reducer
