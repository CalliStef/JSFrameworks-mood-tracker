import  { useState, useReducer } from 'react'  

export default function MoodForm({onSubmit, mood}){

    const id = mood && mood.id ? mood.id : undefined

    const [formData, setFormData] = useState(id ? {
            id: mood.id,
            note: mood.note, 
            rating: mood.rating
        } 
        :{ 
            note: '', 
            rating: ''
        }
    )

    function handleChange(e){
        e.preventDefault()

        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value 
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        onSubmit(formData)   
    }

    return(

        <>
            <h2> {id? "Update Mood" : "Add Mood"}</h2> 

            <form onSubmit={handleSubmit}>
                <label htmlFor="notesInput">Notes</label>
                <input 
                    id="notesInput" 
                    type="text" 
                    name="note" 
                    value={formData.note} 
                    onChange={handleChange}
                />
                
                <label htmlFor="ratingInput">Rating</label>
                <input 
                    id="ratingInput" 
                    type="text" 
                    name="rating" 
                    value={formData.rating}
                    onChange={handleChange}
                />

                <button type='submit'>Submit</button>
            </form>

        </>
        
    )
}