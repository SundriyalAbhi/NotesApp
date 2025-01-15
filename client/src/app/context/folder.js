"use client"
import { API } from "@/Utils/Utils";
import { createContext, useReducer } from "react";

let FolderS = {}


async function getFolders(authData) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization = `bearer ${authData.token}`
            return req
        })
        const responce = await API.get(`/folder/getfolders/${authData.userId}`,)
        return responce?.data
    } catch (error) {
        console.log(error);
    }
    
}

async function createfolder(AuthData,body) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization = `bearer ${AuthData.token}`
            return req
        })
        const responce = await API.post(`/folder/createfolder/${AuthData.userId}`,body)
        return responce?.status
    } catch (error) {
        console.log(error);
    }
}

async function AddNoteInFolder(authData,body) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization = `bearer ${authData.token}`
            return req
        })
        const responce = await API.put(`/folder/addnotesInfolder/`,body)
        return responce?.status
    } catch (error) {
        console.log(error);
    }
}

async function deletefolder(authData,body) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization = `bearer ${authData.token}`
            return req
        })
        const responce = await API.delete(`/folder/deletefolder/${body}`)
        return responce?.status
    } catch (error) {
        console.log(error);
    }
}

async function deleteNotesfromfolder(authData,body) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization = `bearer ${authData.token}`
            return req
        })
        const responce = await API.put("/folder/deletenotesfromfolder",body)
        return responce?.status
    } catch (error) {
        console.log(error);
    }
}

async function getfolderlist(authData,body) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization = `bearer ${authData.token}`
            return req
        })
        const responce = await API.get(`/folder/getfolderNotelist`,{params:body})
        return responce?.data
    } catch (error) {
        console.log(error);
    }
}



export const FolderContext =createContext()

function reducer(state,action){
    switch(action.type){
        case"GET_FOLDERS":
        let FolderState = {...action.payload}
        return FolderState

        default:state
    }
}

export const FolderProvider = ({children})=>{
    const [state,Folderdispatch] = useReducer(reducer,FolderS)
    return(
        <FolderContext.Provider value={{folders:state,Folderdispatch,getFolders,createfolder,AddNoteInFolder,deletefolder,deleteNotesfromfolder,getfolderlist}}>
            {children}
        </FolderContext.Provider>
    )
}

