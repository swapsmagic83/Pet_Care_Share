import React,{useState} from "react";
import { Navigate } from "react-router-dom";

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
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
            id="username"
            name="username"
            type="text"
            value={formData.usename}
            onChange={handleChange}></input>
            <br></br>
            <label htmlFor="password">Password</label>
            <input
            id="password"
            name="password"
            type="text"
            value={formData.password}
            onChange={handleChange}></input>
            <br></br>
            <button>Submit</button>
        </form>
    )
}
export default LoginForm