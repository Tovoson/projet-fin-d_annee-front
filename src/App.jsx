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
import Login from './composants/login/Login'
import Dashbords from './composants/dashboard/Dashbord'
import Mouvements from './composants/mouvements/Mouvements'
import Archive from './composants/archive/Archive'

const Layout = () =>{
  return(
    <>
      {/* <Gauche/> */}
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
        path: "/liste",
        element: <Centre/>,
        },
       { path: "/device",
        element: <Centre/>,
        },
        {path: "/",
        element: <Dashbords/>,
        },
        {path: "/ajoutMateriel",
        element: <Formulaire/>,
        },
        {path: "/move",
        element: <Mouvements/>,
        },
        {path: "/archive",
        element: <Archive/>,
        },
        {path: "/ModifierMateriel/:id",
          element: <Formulaire/>,
        },
        
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
