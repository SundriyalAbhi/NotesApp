"use client"

import { baseURL } from "@/Utils/Utils";
import axios from "axios";

let initialState={}

if(typeof window !=="undefined")
{
    
    initialState=JSON.parse(localStorage.getItem("UserData"))||{
        token:"",
        userId:""
    }
}else{
    initialState={
        token:"",
        userId:""
    }
}

const { createContext, useReducer } = require("react")


async function UserSignUp(body) {
    try {
        const response= await axios.post(`${baseURL}/auth/signup`,body)
        return response?.status
    } catch (error) {
        console.log(error);
    }
}

async function UserSignIn(body) {
    try {
        const response= await axios.post(`${baseURL}/auth/signin`,body)
        return { status: response?.status, data: response?.data}
    } catch (error) {
        console.log(error);
        return error?.response?.status
    }
}

async function getprofile(authData) {
    try {
        const responce = await axios.get(`${baseURL}/profile/getprofile/${authData.userId}`)
        return responce?.data
    } catch (error) {
        console.log(error);
    }
}

async function deleteaccount(authData) {
    try {
        const responce = await axios.delete(`${baseURL}/profile/deleteprofile/${authData.userId}`)
        return responce?.status
    } catch (error) {
        console.log(error);
    }
}

async function profileupdate(authData,body) {
    try {
        console.log(body);
        
        const responce = await axios.put(`${baseURL}/profile/updateprofile/${authData.userId}`,body)
        return responce?.status
    } catch (error) {
        console.log(error);
    }
}

function reducer(state,action){

    switch (action.type) {
        case "SIGN_IN":
        const singinState={...action.payload}
        localStorage.setItem("UserData",JSON.stringify(singinState));
        return singinState;

        case "UPDATE_PROFILE":
        const updatedState={...state,profilepic:action.payload}
        localStorage.setItem("UserData",JSON.stringify(updatedState));
        return updatedState;

        case"SIGN_OUT":
        const signoutstate = {token:"",userId:""}
        localStorage.setItem("UserData",JSON.stringify(signoutstate));
            return signoutstate
    
        default:
            state;
    }

}


export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [state,Authdispatch] = useReducer(reducer,initialState)
    return(
        <AuthContext.Provider value={{AuthData:state,Authdispatch,UserSignUp,UserSignIn,getprofile,deleteaccount,profileupdate}}>
            {children}
        </AuthContext.Provider>

    )
}