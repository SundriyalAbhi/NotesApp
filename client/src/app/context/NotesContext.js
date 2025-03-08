"use client"

import { API } from "@/Utils/Utils";
import axios from "axios";
import { createContext, useContext, useReducer } from "react"

let AllNotes = {}
let NotesContent = {}

async function GetNotes(authData) {
    try {
        API.interceptors.request.clear();
        API.interceptors.request.use((req)=>{
            req.headers.authorization = `bearer ${authData.token}`
            return req
        })
        const response = await API.get(`/notes/getnotes/${authData.userId}`)
        return response?.data
    } catch (error) {
        console.log(error);
        return error.response?.status
    }
}

async function AddNotes(AuthData,body) {
    try {
        API.interceptors.request.clear();
        API.interceptors.request.use((req)=>{
            req.headers.authorization = `bearer ${AuthData.token}`
            return req
        })
        const response = await API.post(`/notes/addnotes/${AuthData.userId}`,body)
        return response?.status
    } catch (error) {
        console.log(error);
    }
}

async function deleteNote(authData,body) {
    try {
        API.interceptors.request.clear();
        API.interceptors.request.use((req)=>{
        req.headers.authorization = `bearer ${authData.token}`
        return req
        })
        const response = await API.delete("/notes/deletenotes",{params:body})
        return response?.status
    } catch (error) {
        console.log(error);
    }
}

async function updateNotes(id) {
    try {
        const response = await API.put(`/notes/updatenotes/${id}`)
        return response?.status
    } catch (error) {
        console.log(error);
    }
    
}

export const NotesContext = createContext()

function reducer(state,action){
    switch (action.type) {
        case "GET_ALL_NOTES":
            let getNotesState={...action.payload}
            return getNotesState;
        default:
            state;
    }
}

function notesReducer(state2,action){
    switch (action.type) {
        case "SHOW_NOTES":
            let ShowNotesState={...action.payload}
            return ShowNotesState;
        default:
            state2;
    }
}



export const NotesProvider = ({children})=>{
    const [state,dispatch] = useReducer(reducer,AllNotes)
    const [state2,notesdispatch] = useReducer(notesReducer,NotesContent)
    return(
        <NotesContext.Provider value={{GetNotes,AddNotes,AllNOTES:state,dispatch,showNote:state2,notesdispatch,deleteNote,updateNotes}}>
            {children}
        </NotesContext.Provider>
    )
}