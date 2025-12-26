require('dotenv').config()
const express = require('express')
const mongoose=require('mongoose')
const users=require('../models/user.model.js')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')

const router=express.Router()
const PORT=3000

router.use(express.json())

router.get('/users', async (req,res)=>{
    const user=await users.find({})
    res.status(200).json(user)
})

router.post('/signup',async (req,res) => {
    try{
        if(!await users.findOne({username:req.body.username})){
        const salt = await bcrypt.genSalt();
        const hashedPassword= await bcrypt.hash(req.body.password , salt);
        console.log(salt);
        console.log(hashedPassword);
        const user={ username: req.body.username , password: hashedPassword};
        const final_user= await users.create(user)

        const user_={username:req.body.username, role:'user'}
        const accessToken=jwt.sign(user_,process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({accessToken:accessToken})     
        }else{
            res.status(400).send('"username already exists"')
        }  
    }catch{
        res.status(500).send()
    }
})

router.post('/login' ,async (req,res) => {
    const user= await users.findOne({username: req.body.username})
    if(!user){
        return res.status(500).send('"user is not found"')
    }
    try{
        if(await bcrypt.compare(req.body.password , user.password)){
            
            const username=req.body.username
            if(username==='KHEERA'){
                const user_={username : username,role : "admin"}
                const accessToken= jwt.sign(user_ , process.env.ACCESS_TOKEN_SECRET)
                res.json({accessToken : accessToken})

            }else{
                const user_={username : username ,role : "user"}
                const accessToken= jwt.sign(user_ , process.env.ACCESS_TOKEN_SECRET)
                res.json({accessToken : accessToken})
            }

            
        }else{
            res.send('"not allowed!!"')
        }
    }catch(error){        
        res.status(500).send(error.message)
    }
})

mongoose.connect('mongodb+srv://warrior:ze82vEtS0WLbQuh6@warrior.7czaqqn.mongodb.net/?appName=warrior')
  .then(() => {console.log('Connected!')})
  .catch((err)=>{console.log("connection failed!");
    console.error(err.message)
  })

module.exports=router;
