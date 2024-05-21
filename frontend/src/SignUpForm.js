import React, {useState} from "react";
import { Navigate } from "react-router-dom";
import './Form.css'

const SignUpForm = ({registerUser}) =>{
    const initial_state={}
    const [formData, setFormData] =useState(initial_state)
    const [isUser,setIsUser] =useState(false)

    const handleChange =(e) =>{
        const {name,value} = e.target
        setFormData(formData =>({
            ...formData,
            [name]:value
        }))
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(registerUser(formData)){
            setIsUser(true)
        }
    }
    if(isUser){
        return <Navigate usename={formData.usename} to='/'/>
    }
    return(
        <div className="SignUpForm">
            <h1 className="h1">Sign Up Here</h1>
        <form onSubmit={handleSubmit}>
            <div className="input">
                <label htmlFor="username" className="label">Username</label>
                <input
                id="username"
                name="uername"
                type="text"
                value={formData.username}
                onChange={handleChange}></input>
            </div>
            <div className="input">
                <label htmlFor="password" className="label">Password</label>
                <input
                id="password"
                name="password"
                type="text"
                value={formData.password}
                onChange={handleChange}></input>
            </div>
            <div className="input">
                <label htmlFor="first_name" className="label">First Name</label>
                <input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}></input><br></br>
            </div>
            <div className="input">
                <label htmlFor="last_name" className="label">Last Name</label>
                <input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}></input> 
            </div>
            <div className="input">
            <label htmlFor="email" className="label">Email</label>
                <input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}></input> 
            </div>
            <button className="button">Submit</button>
        </form>  
        </div>
    )
}
export default SignUpForm