import React, { useContext, useEffect, useState } from 'react'
// import './formstyle.css'
import { AuthContext } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'



export const SignIn = ({setMode}) => {
    const [formData,setFormData] = useState()
    const {AuthData,Authdispatch,UserSignIn} = useContext(AuthContext)
    const router = useRouter()

      
      async function handleSubmit() {
        try {
          if (formData?.email !== undefined && formData?.password !== undefined) {
            const logindata = await UserSignIn(formData);
            if(logindata==404){
              alert("user does not Exists")
            }else if(logindata==401){
              alert("Wrong Password")
            }
            Authdispatch({
              type: "SIGN_IN",
              payload: logindata.data
            })
            if(logindata.status==200){
              router.push("/pages/Home");
            }
          } else {
            alert("Please fill out form")
          }    
        } catch (error) {
          console.log(error);
    
        }
    
      }
      return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100%"}}>
          <div className="card p-3 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#f2f2f2", width:"400px" }}>
            <h5 className='d-flex justify-content-center align-items-center' style={{fontFamily:"sans-serif" , fontWeight:"700"}}>Signin</h5>
            <div className="form-group mt-3 mb-3">
          <input type="email" className="form-control" placeholder="Enter Email" onChange={(e) => {
            setFormData(prev => ({ ...prev, email: e.target.value }));
          }} style={{borderradius: "6px", backgroundcolor: "#e6e6e6",width:"300px"}} />
        </div>
    
        <div className="form-group mb-1">
          <input type="password" className="form-control" placeholder="Enter Password" onChange={(e) => {
            setFormData(prev => ({ ...prev, password: e.target.value }));
          }} style={{borderradius: "6px", backgroundcolor: "#e6e6e6",width:"300px"}} />
        </div>
            <br />
            <button className='btn btn-outline-primary' onClick={() => {
              handleSubmit()
            }} style={{borderRadius:"10px" , width:"160px"}}>Signin!</button>
            <br />
            <button className='btn btn-link w-100' onClick={() => {
              setMode("signup")
            }}>Dont Have An Account? Signup!</button>
            <br />
          </div>
        </div>
      )
}
