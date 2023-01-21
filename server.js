const express = require('express')
const app = express()

app.get('/', (req, res) => {
res.send('Welcome to workoutgenerator.ai!')
})

app.post('/login', (req, res) => {
// code for handling login goes here
})

app.listen(3000, () => {
console.log('Server started on port 3000')
})
