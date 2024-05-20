import React, {useState} from "react";
import PetsApi from "./api";

const NewPostForm = ({addPost,username}) =>{
    const initial_state ={description:"", date_from:"",date_to:""}
    const [formData, setFormData] = useState(initial_state)


    const handleChange = (e) =>{
        const {name,value} = e.target
        setFormData(formData =>({
            ...formData,
            [name]:value
        }))
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        addPost( formData.description,formData.date_from,formData.date_to)
        setFormData(initial_state)
    }

    return (
        <>
        <h1>Add New Post Here {username}</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="description">Description</label>
            <input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}></input><br></br>

            <label htmlFor="date_from">Date From</label>
            <input
            id="date_from"
            name="date_from"
            type="text"
            value={formData.date_from}
            onChange={handleChange}></input><br></br>

            <label htmlFor="date_to">Date To</label>
            <input
            id="date_to"
            name="date_to"
            type="text"
            value={formData.date_to}
            onChange={handleChange}></input><br></br>
            <button>Submit</button>
        </form>
        </>
    )

}
export default NewPostForm