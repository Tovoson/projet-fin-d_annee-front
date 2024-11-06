import { useEffect, useState } from 'react'
import './App.scss'
import Centre from './composants/menuCentre/MenuAuCentre'
import Droite from './composants/menuDroite/MenuDroite'
import Gauche from './composants/menuGauche/MenuGauche'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Formulaire from './composants/formulaire/Formulaire'
import Login from './composants/login/Login'
import Dashbords from './composants/dashboard/Dashbord'
import Mouvements from './composants/mouvements/Mouvements'
import Archive from './composants/archive/Archive'
import AxiosInstance from './composants/Axios'


const Layout = () => {
  return (
    <>
      <Gauche />
      <Outlet />
      <Droite />
    </>
  )
}

// Composant de protection des routes
const ProtectedRoute = ({ children }) => {
  const storedAdmin = localStorage.getItem('admin');
  
  if (!storedAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function App() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);


  const router = createBrowserRouter([
    {
      path: "/login",
      element: !admin ? (
        <Login 
          setAdmin={setAdmin} 
          baseURL={AxiosInstance.defaults.baseURL}
        />
      ) : (
        <Navigate to="/" replace />
      )
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Dashbords />
        },
        {
          path: "/liste",
          element: <Centre />
        },
        {
          path: "/device",
          element: <Centre />
        },
        {
          path: "/ajoutMateriel",
          element: <Formulaire />
        },
        {
          path: "/move",
          element: <Mouvements />
        },
        {
          path: "/archive",
          element: <Archive />
        },
        {
          path: "/ModifierMateriel/:id",
          element: <Formulaire />
        },
        {
          // Route par défaut pour gérer les URLs non trouvées
          path: "*",
          element: <Navigate to="/" replace />
        }
      ]
    }
  ]);

  return (
    <div className='MyApp'>
      { admin 
        ? 
        <RouterProvider router={router} />
        : 
        <Login
          setAdmin = {setAdmin}
          baseURL={AxiosInstance.defaults.baseURL}
        />
      } 
    </div>
  )
}

export default App
