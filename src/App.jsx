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
import Formulaire from './composants/formulaire/Formulaire'
import Recherche from './composants/recherche/Recherche'
import Login from './composants/login/Login'
import Dashbords from './composants/dashboard/Dashbord'

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

  const user = true;

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
        {path: "/",
        element: <Dashbords/>,
        },
        {path: "/nouveau_etudiant",
        element: <Formulaire/>,
        }
        
      ]
    },
  ]);
 
  return (
    <div className='MyApp'>
      { user 
        ? 
        <RouterProvider router={router} />
        : <Login/>
      } 
    </div>
  )
}

export default App
