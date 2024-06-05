import { useState } from "react";

const Support = () => {
    const [takeInformations, setTakeInformations] = useState()
    const handleSubmit = (e) =>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const formDataObject = {}
        formData.forEach((key, value) => {
            formDataObject[key] = value
        })
        setTakeInformations(formDataObject)
    }
    return(
        <>
        <h1>Any problem or feedback for this website?</h1>
        <form action="" onSubmit={handleSubmit}>
            <legend>Please type in your feedback: </legend>
            <input type="email" placeholder="email" required name="email"/>
            <input type="text" placeholder="Your feedback!" name="text" required max={200}/>
            <button type="onSubmit">Click here to send me an email!</button>
        </form>
        
        </>
    )
}

/* Complete the send Email function */

export default Support;