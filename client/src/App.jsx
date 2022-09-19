import { useState, useEffect, useReducer } from 'react'
import './App.css'

import axios from 'axios'
import Mood from './Mood.jsx'
import MoodForm from './MoodForm.jsx'


function App() {
  // hooks can't be used inside loop, conditional statement, nor inside classes
  const [moods, setMoods] = useState([])
  const [form, setForm] = useState(false)
  const [state, dispatch] = useReducer(formReducer, null)


  useEffect(() => {
    axios.get('/api/moods')
    .then(res => {
      setMoods(res.data)
    }).catch(err => {
      console.log('ERROR', err)
    })
  }, [])

  // origin includes:
  // scheme = http
  // domain = localhost
  // port = 8080

  function handleOrderByDate(e){
    e.preventDefault()

    const sortedArr = [...moods].sort(function (a, b){
      return new Date(b.moodDate) - new Date(a.moodDate)
     })

    setMoods(sortedArr)   


  }

  function handleOrderByRating(e){
    e.preventDefault()

      const sortedArr = [...moods].sort(function (a, b){
        return b.rating - a.rating
       })

      setMoods(sortedArr)   
      
  }

  function addOrUpdate(data){

    // console.log("addOrUpdate",data)

    data.id? handleUpdateMood(data) : handleAddMood(data)
  }

  function formReducer(state, action){
    const {type, payload} = action
    setForm(true)
    switch(type){
      case "add":
        return <MoodForm onSubmit={addOrUpdate}/>
      case "update":
        return <MoodForm onSubmit={addOrUpdate} mood={payload}/>
    }

  }

  function handleAddMood(data){

      const newMood = {
        id: self.crypto.randomUUID(),
        note: data.note,
        rating: data.rating,
        moodDate: new Date()
      }

      // setMoods([...moods, newMood])
      // setForm(false)

      axios.post(`/api/moods/${JSON.stringify(newMood)}`)
            .then((res) =>  setMoods(res.data))
            .then(() => setForm(false))
            .catch(err => console.error(err))

  }

  function handleDeleteMood(id){
    // setMoods(moods.filter(mood => mood.id !== id))

  
    axios.delete(`/api/moods/${id}`)
         .then((res) => setMoods(res.data))
         .catch(err => console.error(err))

  }

  function handleEditMood(moodData){
    setForm(true)
    dispatch({type: 'update', payload: moodData})
  }

  function handleUpdateMood(data){
  //   const updatedData = {
  //    ...data,
  //     moodDate: new Date()
  // }


  // moods.forEach((mood, index) => {
  //     if(mood.id === updatedData.id){
  //         test_moodsArr[index] = updatedData
  //     }
  // })
   
    axios.put(`/api/moods/${JSON.stringify(data)}`)
         .then((res) => setMoods(res.data))
         .then(() => setForm(false))
         .catch(err =>  console.error(err))
  }

  return (
    <div className="App">

      <h1>Mood Tracker</h1>

      {form === false ?
        <div className="home-page__container">
          {/* <button onClick={() => form ? setForm(false) : setForm(true)}>Add Mood</button> */}
          <button onClick={() => dispatch({type: "add"})}>Add Mood</button>
          <button onClick={handleOrderByDate}>Order by Date</button>
          <button onClick={handleOrderByRating}>Order by Rating</button>

          {
            moods.map(mood => (
              <Mood key={mood.id} moodData={mood} onDelete={handleDeleteMood} onEdit={handleEditMood}/>
            ))  
          }
          </div> 
          :
          <>{state}</>
      }

      
       
      
      
    </div>
  )
  
}

export default App
