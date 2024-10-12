import { useState } from 'react'
import './App.scss'
import Centre from './composants/menuCentre/MenuAuCentre'
import Droite from './composants/menuDroite/MenuDroite'
import Gauche from './composants/menuGauche/MenuGauche'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

const Layout = () =>{
  return(
    <>
      <Gauche/>
      <Outlet/>
      <Droite/>
    </>
  )
}

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
       {
        path: "/Utilisateur",
        element: <Centre/>,
        },
       { path: "/device",
        element: <div>device</div>,
        },
        {path: "/dash",
        element: <div>dash</div>,
        }
        
      ]
    },
  ]);
 
  return (
    <div className='MyApp'>
      <RouterProvider router={router} /> 
    </div>
  )
}

export default App
