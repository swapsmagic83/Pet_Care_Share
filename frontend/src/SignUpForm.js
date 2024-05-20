import React, {useState} from "react";
import { Navigate } from "react-router-dom";

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
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
            id="username"
            name="uername"
            type="text"
            value={formData.username}
            onChange={handleChange}></input><br></br>

        <label htmlFor="password">Password</label>
            <input
            id="password"
            name="password"
            type="text"
            value={formData.password}
            onChange={handleChange}></input><br></br>

        <label htmlFor="first_name">First Name</label>
            <input
            id="first_name"
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}></input><br></br>

        <label htmlFor="last_name">Last Name</label>
            <input
            id="last_name"
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}></input> <br></br>

        <label htmlFor="email">Email</label>
            <input
            id="email"
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}></input> <br></br>
            <button>Submit</button>
        </form>  
    )
}
export default SignUpForm