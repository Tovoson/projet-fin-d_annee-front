import { useState } from "react";
//import "./login.scss";
import { Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AxiosInstance from "../Axios";

const Register = ({ setAdmin, baseURL }) => {
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

  const handleRegister = (e) => {
    e.preventDefault();
    AxiosInstance.post("admins/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("données ajouté avec succès:", response);
        setAvatar({
          file: null,
          url: "",
        });
      })
      .catch((error) => {
        console.log("Erreur:", error.response); // Affiche les détails de l'erreur
      });
    console.log("identification " + id, nom, mdp, avatar);
    setBtn(true);
  };

  const handleClick = () => {
    setVisibilite(!visibilite);
  };

  const handleClickReg = () => {
    setVisibiliteReg(!visibiliteReg);
  };

  return (
    <div className="flex items-center justify-center w-full px-10 h-screen bg-linear-to-r from-cyan-500 to-blue-500">

      <div className="flex items-center h-2/3 justify-center w-1/2 flex-col shadow-2xl p-2.5 g-5 rounded-2xl">
        <h2 className="font-bold text-2xl">Register</h2>
        <form
          onSubmit={handleRegister}
          className="flex items-center justify-center gap-5.5 w-80 flex-col mx-5 px-5 py-10 rounded-2xl"
        >
          <label htmlFor="file" className="flex items-center justify-center gap-2.5">
            <img
              src={avatar.url || "./icons8-g-48.png"}
              alt=""
              className="w-6 h-6"
            />{" "}
            <nav className="hover:underline cursor-pointer">
              Telechager une image
            </nav>
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />

          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 p-3 w-full shadow-md rounded-2xl focus:outline-none"
            required
            onChange={(e) => setNom(e.target.value)}
          />

          <div className="flex items-center justify-center border border-gray-300 p-3 w-full shadow-md rounded-2xl">
            <input
              type={visibiliteReg ? "text" : "password"}
              className="w-full focus:outline-none"
              required
              placeholder="********"
              onChange={(e) => setMdp(e.target.value)}
            />
            <div onClick={handleClickReg}>
              {visibiliteReg ? (
                <Visibility className="text-gray-400" />
              ) : (
                <VisibilityOff className="text-gray-400" />
              )}
            </div>
          </div>
          <Button
            variant="contained"
            onClick={handleRegister}
            className={btn ? "btn" : ""}
          >
            {btn ? "Chargement..." : "Créer"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
