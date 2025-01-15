import React, { useContext, useEffect, useState } from 'react'
import './formstyle.css'
import { AuthContext } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'

export const SignIn = ({setMode}) => {
    const [formData,setFormData] = useState()
    const {AuthData,dispatch,UserSignIn} = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (AuthData?.token) {
          router.push("/pages/Home");
        }
      }, [AuthData])
      
      async function handleSubmit() {
        try {
          if (formData?.email !== undefined && formData?.password !== undefined) {
            const data = await UserSignIn(formData);
            dispatch({
              type: "SIGN_IN",
              payload: data
            })
          } else {
            alert("Please fill out form")
          }    
          if (AuthData?.token === null || AuthData?.token === undefined) {
            alert("Invalid Email or Password");
          }
        } catch (error) {
          console.log(error);
    
        }
    
      }
  return (
    <div>
<div className='container2'>
            <h2>SignIn</h2>
            <div id='inputs'>
            <input type="text" placeholder='Enter Your Name' 
            onChange={(e)=>{
                setFormData(prev=>({...prev,Name:e.target.value}))
            }}/>
            <input type="text" placeholder='Enter Email'onChange={(e)=>{
                setFormData(prev=>({...prev,email:e.target.value}))
            }}/>
            <input type="text" placeholder='Enter Password'onChange={(e)=>{
                setFormData(prev=>({...prev,password:e.target.value}))
            }}/>

            <button onClick={()=>{
                console.log(formData);
                handleSubmit()
            }}>Submit</button>
            </div>

    </div>
    </div>
  )
}
