import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Login from "./login"
import Crud from "./Crud"
import Signup from "./Signup"

const router=createBrowserRouter(
  [
    {
      path:"/",
      element:<Login/>
    },
    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:"/crud",
      element:<Crud/>
    }
  ]
)

export default function App(){
  return(
    <RouterProvider router={router}> </RouterProvider>
  )
}
