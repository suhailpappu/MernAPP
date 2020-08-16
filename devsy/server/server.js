const express = require('express');

const path = require('path')

const connectDB = require('../db/db');
const publicPath = path.join(__dirname,'..','public')

const app = express()
connectDB()

//Init Middleware
app.use(express.json({extended:false}))

// app.get('/',(req,res)=> res.send("API RUNNING"))

//Define Routes

app.use('/api/users',require('../src/routes/api/users'))
app.use('/api/auth',require('../src/routes/api/auth'))
app.use('/api/profile',require('../src/routes/api/profile'))
app.use('/api/posts',require('../src/routes/api/posts'))


const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(publicPath))

app.get('*', (req,res) => {
    res.sendFile(path.join(publicPath,'index.html'))
})
}



app.listen(PORT,() => console.log(`Server started on port ${PORT}`))