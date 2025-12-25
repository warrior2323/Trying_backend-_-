import {useState} from "react"
import {useNavigate} from "react-router-dom"

export default function Login(){

    const [username,setUsername]=useState("")
    const [password ,setPassword]=useState("")
    const navigate=useNavigate()
    
    const handlesubmit =async (e)=>{
        e.preventDefault()
        try{
            const response=await fetch('http://localhost:3000/api/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({username:username,password:password})
            })

            const data=await response.json()

            if(response.ok){
                localStorage.setItem('userToken' , data.accessToken)

                alert("Login successfull")
                navigate('/CRUD')
            }else{
                alert("login failed")
            }

        }catch(error){
            console.log(error)
        }
    }

    const handleSignUp=async (e)=>{
        e.preventDefault
        try{
            const response=await fetch('http://localhost:3000/api/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },

                body:JSON.stringify({username:username,password:password})           
            })

            const data=await response.json()

            if(response.ok){
                localStorage.setItem('userToken',data.accessToken)
                alert('SignUp Successfull')
            }else{
                alert('There is some error')
            }
        }catch(error){
            console.log(error)
        }
    }
    return(
        <>
        <div className="flex justify-center items-center fixed left-0 top-0 z-1000 bg-black h-full w-full backdrop-blur-[5px]">
            <div className="text-black text-center flex-col items-center justify-center bg-white p-10">
        <form onSubmit={handlesubmit} className="flex-col items-center justify-center">
            <h1 className="text-[20px]">Login</h1>
            <input type="text" 
            placeholder="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)} 
            className="w-full h-8 mb-3 rounded-xl mt-2 placeholder-black border-black border pl-2">
            </input>
            

            <input type="password"
            placeholder="passoword"
            value={password}
            onChange={(e) => setPassword(e.target.value) }
            className="w-full h-8 mb-3 rounded-xl mt-2 placeholder-black border-black border pl-2"
            ></input>

            
            <button type="submit" className="w-full bg-black text-white h-8 rounded-xl ">Submit</button>
            
        </form>
        <span>Haven't signed up?</span>
        <button>Sign Up</button>
        </div>
        </div>
        </>
    )
}