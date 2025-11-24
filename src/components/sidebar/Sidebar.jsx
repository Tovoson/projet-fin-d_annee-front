import React from "react";
//import "./menuGauche.scss";
import PersonIcon from "@mui/icons-material/Person";
import MonitorIcon from "@mui/icons-material/Monitor";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import ArchiveIcon from "@mui/icons-material/Archive";
const Sidebar = ({ setAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };
  const dashboard = () => {
    navigate("/");
    console.log("object");
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

  const liste = [
    {
      id: 1,
      icon: <DashboardIcon />,
      text: "Tableau de bord",
      action: dashboard,
    },
    {
      id: 2,
      icon: <MonitorIcon />,
      text: "Matériel",
      action: redirigerDevice,
    },
    {
      id: 3,
      icon: <SettingsBackupRestoreIcon />,
      text: "Mouvements",
      action: move,
    },
    {
      id: 4,
      icon: <ArchiveIcon />,
      text: "Archives",
      action: archives,
    },
  ];

  return (
    <div className="flex flex-col g-3 w-1/6 border-r border-gray-300">
      <div className="h-20 flex items-center justify-center shadow-md">
        <img src="./icons8-g-48.png" alt="" className="w-4 h-4" />
      </div>

      <div className="flex flex-col h-full justify-between py-5">
        <div className="flex items-start flex-col gap-2">
          {liste.map((item) => (
            <div
              key={item.id}
              className="w-full p-2 hover:bg-gray-200 flex gap-2 hover:shadow-md hover:cursor-pointer transition delay-150 duration-300 ease-in-out"
              onClick={item.action}
            >
              <div>{item.icon}</div>
              <nav className="font-bold text-gray-700"> {item.text} </nav>
            </div>
          ))}
        </div>

        <div className="footer">
          <div className="elements">
            <div className="p-2 flex items-center gap-2 w-full transition delay-75 duration-300 hover:bg-gray-200 hover:cursor-pointer">
              <div>
                <LogoutIcon className="icon text-red-400" />
              </div>
              <span className="text-gray-700 font-bold">Deconnecter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
