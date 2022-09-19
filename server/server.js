const express = require('express')
const app = express()

const test_moodsArr = [
    {
        id: '1',
        note: 'Tired af',
        rating: 4,
        moodDate: new Date(new Date() - Math.random()*(1e+12))
    },
    {
        id: '2',
        note: 'So happy',
        rating: 10,
        moodDate: new Date(new Date() - Math.random()*(1e+12))

    },
    {
        id: '3',
        note: 'idk honestly',
        rating: 5,
        moodDate: new Date(new Date() - Math.random()*(1e+12))
    },
    {
        id: '4',
        note: 'LIfe is meanigless',
        rating: 1,
        moodDate: new Date(new Date() - Math.random()*(1e+12))
    }
]


app.get('/', (req, res) => {
    //serve the react app
})

app.get('/api/moods', (req, res) => {
    res.send(test_moodsArr)
})

app.post('/api/moods/:newMoodData', (req, res) => {
    const newMoodObj = JSON.parse(req.params.newMoodData)

    test_moodsArr.push(newMoodObj)

    res.send(test_moodsArr)

})

app.delete('/api/moods/:id', (req, res) => {
    console.log('DELETE REQUEST RECEIVED')
    const selectedId = req.params.id

    test_moodsArr.splice(test_moodsArr.findIndex(mood => mood.id === selectedId), 1)
    // test_moodsArr = filtered

    console.log("DELETED MOOD", test_moodsArr)

    res.send(test_moodsArr)
})

app.put("/api/moods/:updatedData", (req, res) => {
    const updatedData = {
        ...JSON.parse(req.params.updatedData),
        moodDate: new Date()
    }

    test_moodsArr.forEach((mood, index) => {
        if(mood.id === updatedData.id){
            test_moodsArr[index] = updatedData
        }
    })

    res.send(test_moodsArr)

})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`listening on port http://localhost:${port}`))