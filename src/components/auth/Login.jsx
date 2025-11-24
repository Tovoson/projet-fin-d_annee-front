import { useState } from "react";
//import "./login.scss";
import { Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AxiosInstance from "../Axios";

const Login = ({ setAdmin, baseURL }) => {
  const [visibilite, setVisibilite] = useState(false);
  const [visibiliteReg, setVisibiliteReg] = useState(false);
  const [nom, setNom] = useState("");
  const [id, setId] = useState("");
  const [mdp, setMdp] = useState("");
  const [btn, setBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [idAdmin, setIdAdmin] = useState("");
  const [password, setPassword] = useState("");

  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const formData = new FormData();
  formData.append("id_admin", id);
  formData.append("nom_admin", nom);
  formData.append("photo_admin", avatar.file);
  formData.append("mot_de_passe", mdp);

  const handleClick = () => {
    setVisibilite(!visibilite);
  };

  const handleClickReg = () => {
    setVisibiliteReg(!visibiliteReg);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      /* const response = await AxiosInstance.post("admins/auth_admin/", {
        id_admin: idAdmin,
        mot_de_passe: password,
      }); */

      //if (response.status === 200) {
      const adminData = {
        id_admin: 1,
        nom_admin: "tovo",
        photo_admin: "df",
      };

      // Construire l'URL complète pour la photo
      if (adminData.photo_admin) {
        adminData.photo_admin = `${baseURL}${adminData.photo_admin}`;
      }
      setAdmin(adminData);
      localStorage.setItem("admin", JSON.stringify(adminData));
      //}
    } catch (error) {
      setError(error.response?.data?.error || "Erreur lors de la connexion");
      localStorage.removeItem("admin");
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-10 h-screen bg-linear-to-r from-cyan-500 to-blue-500">
      <div className="flex items-center h-2/3 justify-center w-100 shadow-2xl flex-col p-2.5 backdrop-blur-xs rounded-2xl">
        <h2 className="font-bold text-2xl">Login</h2>
        <form className="flex items-center justify-center gap-5.5 w-80 flex-col mx-5 px-5 py-10 rounded-2xl">
          <input
            type="text"
            className="border border-gray-300 p-3 w-full shadow-md rounded-2xl focus:outline-none"
            //required
            placeholder="Username"
            onChange={(e) => setIdAdmin(e.target.value)}
          />
          <div className="flex items-center justify-center border border-gray-300 p-3 w-full shadow-md rounded-2xl">
            <input
              type={visibilite ? "text" : "password"}
              className="w-full focus:outline-none"
              //required
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div onClick={handleClick}>
              {visibilite ? (
                <Visibility className="text-gray-400" />
              ) : (
                <VisibilityOff className="text-gray-400" />
              )}
            </div>
          </div>
          <button
            onClick={handleLogin}
            disabled={loading}
            class="bg-blue-500 hover:bg-sky-700 text-white p-2 rounded-lg"
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
