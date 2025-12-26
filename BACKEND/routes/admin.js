const express=require('express')
const mongoose=require('mongoose')
const Product =require('../models/product.model.js')

const router=express.Router()
PORT=3000

router.use(express.json())

//to view all the user's data
router.get('/read',async (req ,res )=>{
    const productlist=await Product.find({})
    if(productlist.length>0){
        res.status(200).send(productlist)
    }else{
        res.status(200).send('"There are no such products on your server"')
    }
})

//to update a prodcut
router.put('/update/:id',async (req,res) =>{
    try{
    const {id}=req.params
    const newproduct=await Product.findByIdAndUpdate(id,req.body)
    if(!newproduct){
        res.status(500).send('"Product not found!"')
    }else{
        res.status(200).send(`"
            Product with id -${id} successfully updates" `)
    }
    }catch(error){
        res.status(500).send(error.message)
    }   
})

//to delete a task
router.delete('/delete/:id',async (req,res) =>{
    try{
        const {id}=req.params
        const deletedProduct=await Product.findByIdAndDelete(id)

        if(!deletedProduct){
            res.status(500).send('"Product not found"')           
        }else{
            res.status(200).send('"Product successfully deleted"')
        }
        
    }catch(error){
        res.status(500).send(error.message)
    }
})
router.post('/create',async(req,res)=>{
    try{
        const data=await Product.create(req.body)
        res.status(200).send('"Data successfully added"')

    }catch(err){
        res.status(500).send(err.message)
    }
})

module.exports=router;
