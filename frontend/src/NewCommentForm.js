import React, {useState} from "react";

const NewCommentForm = ({addNewComment}) =>{
    const initial_state = {comment:""}
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
        addNewComment(formData.comment)
        setFormData(initial_state)
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="comment">Comment</label>
            <input
            id="comment"
            name="comment"
            type="text"
            value={formData.comment}
            onChange={handleChange}></input>
            <button>Submit</button>
        </form>
    )
}
export default NewCommentForm