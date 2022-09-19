import { useState } from 'react'
import moodForm from './MoodForm'

export default function Mood({moodData, onDelete, onEdit}){


    let stars = ""
    for (let i = 0; i < 10; i++) {
        if (i < moodData.rating) {
        stars += "⭐"
        } else {
        stars += "☆"
        }
    }

    return(

        <>
            <div className="mood">
                <p>{moodData.moodDate.toString()}</p>
                <p>{moodData.note}</p>
                <p>{stars}</p>

                <button onClick={() => onDelete(moodData.id)}>Remove</button>
                <button onClick={() => onEdit(moodData)}>Edit</button>
            </div>
            
        
        </>

    )

}