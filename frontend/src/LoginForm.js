import React,{useState} from "react";
import { Navigate } from "react-router-dom";
import './Form.css'

const LoginForm = ({loginUser}) =>{
    const initial_state ={}
    const [formData, setFormData] = useState(initial_state)
    const [isUser, setIsUser] =useState(false)

    const handleChange =(e) =>{
        const {name,value} = e.target
        setFormData(formData =>({
            ...formData,
            [name]:value
        }))
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        let isLoginSuccess = loginUser(formData)
        if(isLoginSuccess){
            setIsUser(true)
        }
    }
    if(isUser){
        return <Navigate usename={formData.usename} to='/'/>
    }
    return(
        <div className="LoginForm">
            <h1 className="h1">Login Here</h1>
        <form onSubmit={handleSubmit}  >
            <div className="input">
            <label htmlFor="username" className="label">Username</label>
            <input
            id="username"
            name="username"
            type="text"
            value={formData.usename}
            onChange={handleChange}
            ></input>
           </div>
           <div className="input">
            <label htmlFor="password" className="label">Password</label>
            <input
            id="password"
            name="password"
            type="text"
            value={formData.password}
            onChange={handleChange}
            ></input>
            </div>
            <button className="button" >Submit</button>
        </form>
        </div>
    )
}
export default LoginForm