import React, { useContext, useState } from 'react'
import './formstyle.css'
import { AuthContext } from '@/app/context/AuthContext'
export const SignUp = ({setMode}) => {
    const[formData,setFormData] = useState()
    const {UserSignUp} = useContext(AuthContext)

    async function handleSubmit() {
        try {
          if (formData?.Name != "" && formData?.email != "" && formData?.password != "" && formData?.confirmPassword != "") {
            if(formData?.password == formData?.confirmPassword){
              const status=await UserSignUp(formData);
              if(status==200){
                setMode("signin")
                console.log("signUp");
              }
            }else{
              alert("Passwords donot match")
            }
          } else {
            alert("Please fill out form")
          }
        } catch (error) {
          console.log(error);
    
        }
      }
  return (
    <div>

        <div className='container'>
            <h2>SignUp</h2>
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
            <input type="text" placeholder='Confirm Password'onChange={(e)=>{
                setFormData(prev=>({...prev,confirmPassword:e.target.value}))
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
