import { useState ,useRef } from "react"

export default function Crud(){
    const [products,setProducts]=useState([])
    const idRef=useRef(null)
    const createRef=useRef(null)
    const updateRef=useRef(null)
    const idUpdateRef=useRef(null)


    const handleread=async (e)=>{
        e.preventDefault()
        const token=localStorage.userToken
        try{
            const response=await fetch('http://localhost:3000/enter/posts',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization" : `Bearer ${token}`
                }
            })
            const data=await response.json()

            if(response.ok){
                setProducts(data.map(product => <pre key={product._id} className="w-100vw whitespace-pre-wrap">{JSON.stringify(product,null,2)}</pre>))
            }else{
                alert("error")
            }
        }catch(error){
            console.log(error.message)
        }

    }

    const handledelete=async (e) =>{
        e.preventDefault()
        const token=localStorage.userToken

        const value=idRef.current?.value
        idRef.current.value=""
        
        try{
            const response=await fetch(`http://localhost:3000/enter/delete/${value}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization" : `Bearer ${token}`
                }
            })
            if(response.ok){
                alert("Data successfully deleted")
            }else{
                alert("deletion failed")
            }
        }catch(error){
            console.log(error)

        }
    }

    const handlecreate=async (e)=>{
        e.preventDefault()
        const token=localStorage.userToken
        const value=createRef.current?.value
        createRef.current.value=""
        if(value===""){
            alert("please enter some data to be appended in the server")
            return 
        }
        try{const response=await fetch('http://localhost:3000/enter/posts',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:value
        })

        const data=await response.json()
        if(response.ok){
            alert(data)
        }else{
            alert("there is some error")
        }
    }catch(error){
        console.log(error)
    }
    }

    const handleedit =async (e)=>{
        e.preventDefault()
        const token=localStorage.userToken
        const id=idUpdateRef.current.value
        const updatedValue=updateRef.current?.value
        idUpdateRef.current.value="" 
        updateRef.current.value="" 
        if(id===""){
            alert("enter a id bro!")
        }
        
        if(updatedValue===""){
            alert("enter a value to upadate bro 0_0")
        }

        try{const response =fetch(`http://localhost:3000/enter/posts/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:updatedValue
        })
        
            const data=await response.json()

            if(response.ok){
                alert(data)
            }else{
                alert("There is some error")
            }
        }catch{
            console.log(error)
        }
    }

    return(
        <section className="flex flex-col">
        <a onClick={handleread} className="cursor-pointer font-bold">Read your projects</a>
        {products && products}
        <a className="cursor-pointer font-bold" >Create a new product entry </a>
        <form onSubmit={handlecreate} >
            <textarea className="border border-black" ref={createRef}></textarea>
            <button type="submit" className="bg-black text-white h-5 w-20">Create</button>
        </form>
        <a className="cursor-pointer font-bold">Update a product</a>
        <form onSubmit={handleedit}>
            <input type="text" placeholder="_id" ref={idUpdateRef} className="border"></input><br></br>
            <textarea ref={updateRef} className="border"></textarea>
            <button type="submit" className="bg-black text-white h-5 w-20"></button>
        </form>
        <a className="cursor-pointer font-bold">Delete a product's entry with the help of its id</a>
        <form onSubmit={handledelete} >
        <input className="text-black border border-black" ref={idRef}></input>
        </form>
        </section>
    )
}