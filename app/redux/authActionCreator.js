import * as actionTypes from "./actionTypes";
import axios from "axios";
import { AsyncStorage } from 'react-native';

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
        }
    }
}

export const auth = (email, password, mode) => dispatch => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true,
    }
    let authUrl = null;
    if (mode === "Sign Up") {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    } else {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }

    const API_KEY = "AIzaSyA0hTQQB8x2kzm3Amet_rDmkPCaaCetJ7k";
    axios.post(authUrl + API_KEY, authData)
        .then(response => {
            //console.log(response);
            //const expirationTime = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
            // console.log("Post time:", expirationTime);
            // let ls = {
            //     token: response.data.idToken,
            //     userId: response.data.localId,
            //     expirationTime: expirationTime,
            // }
            // AsyncStorage.setItem('ls', JSON.stringify(ls));
            AsyncStorage.setItem('token', response.data.idToken);

            AsyncStorage.setItem('userId', response.data.localId);

            // AsyncStorage.setItem('expirationTime', expirationTime);


            dispatch(authSuccess(response.data.idToken, response.data.localId))
            // .catch(err => console.log(err))

        })

}

export const logout = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('expirationTime');
    AsyncStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const authCheck = () => dispatch => {
    AsyncStorage.getItem('token', (err, result) => {
        const token = result;
        if (!token) {

            //logout 
            dispatch(logout());
        } else {
            AsyncStorage.getItem('userId', (err, id) => {
                const userId = id;
                dispatch(authSuccess(token, userId));
            });
            // AsyncStorage.getItem('expirationTime', (err, extime) => {
            //     const expirationTime = extime;
            //     console.log("extime:", extime);
            //     if (expirationTime <= new Date()) {
            //         //logout
            //         // dispatch(logout());
            //     } else {


            //     }
            // });

        }
    });

}
