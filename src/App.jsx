import { useEffect, useState } from "react";
import "./App.css";
import Content from "./components/Content/Content";
import Sidebar from "./components/sidebar/Sidebar";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Formulaire from "./components/formulaire/Formulaire";
import Login from "./components/auth/Login";
import Dashbords from "./components/dashboard/Dashbord";
import Mouvements from "./components/mouvements/Mouvements";
import Archive from "./components/archive/Archive";
import AxiosInstance from "./components/Axios";
import { Toaster } from "react-hot-toast";
import Register from "./components/auth/Register";

const Layout = ({ setAdmin }) => {
  return (
    <>
      <Sidebar setAdmin={setAdmin} />
      <Outlet />
    </>
  );
};

// Composant de protection des routes
const ProtectedRoute = ({ children }) => {
  const storedAdmin = localStorage.getItem("admin");

  if (!storedAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: !admin ? (
        <Login setAdmin={setAdmin} baseURL={AxiosInstance.defaults.baseURL} />
      ) : (
        <Navigate to="/" replace />
      ),
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout setAdmin={setAdmin} />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Dashbords />,
        },
        {
          path: "/liste",
          element: <Content />,
        },
        {
          path: "/device",
          element: <Content />,
        },
        {
          path: "/ajoutMateriel",
          element: <Formulaire />,
        },
        {
          path: "/move",
          element: <Mouvements />,
        },
        {
          path: "/archive",
          element: <Archive />,
        },
        {
          path: "/ModifierMateriel/:id",
          element: <Formulaire />,
        },
        {
          // Route par défaut pour gérer les URLs non trouvées
          path: "*",
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ]);

  return (
    <div className="h-screen w-full flex">
      <div>
        <Toaster />
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
