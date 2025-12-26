const express=require('express')
const mongoose=require('mongoose')
const Product=require('../models/product.model.js')

const router=express.Router()
const PORT=3000

router.use(express.json())
// to view the user's posts 
router.get('/posts',async (req,res)=>{
    const productlist= await  Product.find({username: req.user.username})
    if(productlist.length>0){
        res.status(200).send(productlist)
    }else{
        res.status(500).send('"You have no posts sir "')
    }
}) 
// to create a new product 
router.post('/posts',async (req,res) =>{
    try{   
        if(req.body.username!=req.user.username) {
            res.status(404).send('"why are you trying to do wrong task"')
        }
        else{
    const post_= await Product.create(req.body)
    res.status(200).send('"data was successfully appended"')
        }
    }catch(error){
    console.log(req.user)
    res.status(500).send(error.message)
}
})


//to update a task
router.put('/posts/:id' ,async (req,res)=>{
    try{if(req.body.username!=req.user.username){
           res.status(404).send('"why are you trying to do wrong task"')
    }else{
        const {id} = req.params
        const newproduct=await Product.findByIdAndUpdate(id,req.body)

        if(!newproduct)res.status(500).send('"product does not exist"')
        }
    }catch(error){
         res.status(500).send(error.message)
    }
})

//to delete a task
router.delete('/delete/:id',async (req,res)=>{
    try{
        const {id} =req.params
        const producttodelete=await Product.findByIdAndDelete(id)
        if(!producttodelete) res.status(500).send('"product not found"')
        res.status(200)
    }catch(error){
        res.status(500).send(error.message)
    }
})

module.exports=router;

