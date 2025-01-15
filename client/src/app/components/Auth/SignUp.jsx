import React, { useContext, useState } from 'react'
// import './formstyle.css'
import { AuthContext } from '@/app/context/AuthContext'
export const SignUp = ({setMode}) => {
    const[formData,setFormData] = useState({})
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
        <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{backgroundcolor: "#f8f9fa", maxwidth: "500px", borderradius: "12px"}}>
        <h2 className="text-center mb-4">Signup</h2>
        
        <div className="form-group">
          <input type="text" className="form-control mb-3" placeholder="Username" onChange={(e) => {
            setFormData(prev => ({ ...prev, username: e.target.value }));
          }} style={{borderradius: "6px", backgroundcolor: "#e6e6e6"}} />
        </div>
    
        <div className="form-group">
          <input type="email" className="form-control mb-3" placeholder="Email" onChange={(e) => {
            setFormData(prev => ({ ...prev, email: e.target.value }));
          }} style={{borderradius: "6px", backgroundcolor: "#e6e6e6"}}/>
        </div>
    
        <div className="form-group">
          <input type="password" className="form-control mb-3" placeholder="Password" onChange={(e) => {
            setFormData(prev => ({ ...prev, password: e.target.value }));
          }} style={{borderradius: "6px", backgroundcolor: "#e6e6e6"}} />
        </div>
    
        <div className="form-group">
          <input type="password" className="form-control mb-3" placeholder="Confirm Password" onChange={(e) => {
            setFormData(prev => ({ ...prev, confirmPassword: e.target.value }));
          }} style={{borderradius: "6px", backgroundcolor: "#e6e6e6"}} />
        </div>
    
        <label>Profile Picture</label>
        <input type="file" className="form-control mb-3" onChange={(e) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(e.target.files[0]);
          fileReader.addEventListener("load", (e) => {
            setFormData(prev => ({ ...prev, ProfilePicture: e.currentTarget.result }));
          });
        }} />
    
        <div className="text-center mb-3">
          <img src={formData.ProfilePicture} className="rounded-circle" style={{width: "150px", height: "150px", objectfit: "cover"}} alt="Profile" />
        </div>
    
        <button className="btn btn-primary w-100 mb-3" onClick={() => handleSubmit()}>Signup!</button>
        
        <button className="btn btn-outline-secondary w-100" onClick={() => setMode("signin")}>
          Already have an account? Signin!
        </button>
      </div>
    </div>
    
      )
}
