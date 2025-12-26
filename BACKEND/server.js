require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const cors=require('cors')
const login=require("./routes/login.js")
const crud=require("./routes/crud.js")
const admin=require("./routes/admin.js")
const { authenticateToken, isAdmin } = require('./middleware/auth.js')


const app=express()
const PORT=3000

app.use(cors())
app.use('/api',login)



app.use('/enter',authenticateToken,crud)
app.use('/admin',authenticateToken,isAdmin,admin)

app.listen(PORT , () =>{
    console.log("server is listening......!")
})

mongoose.connect(`${process.env.CONNECTION_STRING}`)
  .then(() => {console.log('Connected!')})
  .catch((err)=>{console.log("connection failed!");
    console.error(err.message)
  })






