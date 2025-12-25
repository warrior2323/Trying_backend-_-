const express=require('express')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const cors=require('cors')
const login=require("./routes/login.js")
const crud=require("./routes/crud.js")
const app=express()
const PORT=3000

app.use(cors())
app.use('/api',login)


function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization']
    const token= authHeader && authHeader.split(' ')[1]
    if(!token) return res.status(500).send('You have not logged in')
    
    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET, (err,user) => {
      if(err) return res.status(500).send("pehle hi fursat mein nikal")
      req.user=user
      next()

    })

}

app.use('/enter',authenticateToken,crud)

app.listen(PORT , () =>{
    console.log("server is listening......!")
})

mongoose.connect('mongodb+srv://warrior:ze82vEtS0WLbQuh6@warrior.7czaqqn.mongodb.net/?appName=warrior')
  .then(() => {console.log('Connected!')})
  .catch((err)=>{console.log("connection failed!");
    console.error(err.message)
  })



module.exports={authenticateToken}


