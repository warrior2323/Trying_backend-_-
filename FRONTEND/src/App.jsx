import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./login"
import Crud from "./Crud"
const router=createBrowserRouter(
  [
    {
      path:"/",
      element:<Login/>
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
