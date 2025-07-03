import React from "react";
import "./menuGauche.scss";
import PersonIcon from "@mui/icons-material/Person";
import MonitorIcon from "@mui/icons-material/Monitor";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import ArchiveIcon from "@mui/icons-material/Archive";
const Gauche = ({ setAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };
  const dashboard = () => {
    navigate("/");
  };
  const redirigerDevice = () => {
    navigate("./device");
  };
  const move = () => {
    navigate("./move");
  };
  const archives = () => {
    navigate("./archive");
  };
  return (
    <div className="m-gauche">
      <div className="head">
        <div className="logo">
          <img src="./icons8-g-48.png" alt="" />
        </div>
        <h1>estion des matériels pédagogique</h1>
      </div>
      <div className="listes">
        <div className="titre">
          <h2>Overview</h2>
        </div>

        <div className="items">
          <div onClick={dashboard}>
            <DashboardIcon className="icon" />
            <p>Tableau de bord</p>
          </div>
          <div onClick={redirigerDevice}>
            <MonitorIcon className="icon" />
            <p>Matériel</p>
          </div>
          <div onClick={move}>
            <SettingsBackupRestoreIcon className="icon" />
            <p>Mouvements</p>
          </div>
          <div onClick={archives}>
            <ArchiveIcon className="icon" />
            <p>Archive</p>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="elements">
          <div className="logOut" onClick={handleLogout}>
            <LogoutIcon className="icon" />
            <span>Deconnecter</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gauche;
