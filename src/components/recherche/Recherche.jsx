import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./recherche.scss";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useNavigate } from "react-router-dom";

const Recherche = ({ val }) => {
  const navigate = useNavigate();
  const rediriger = () => {
    navigate("../ajoutMateriel");
  };
  return (
    <>
      <div className="recherche">
        <SearchIcon className="icon" />
        <input type="text" placeholder="Rechercher ..." />
      </div>
      {val ? (
        <>
          <div className="affiche">
            <div className="texte">
              <h2>
                On peut voir tous les Utilisateur
                <br /> dans l'établissement ici
              </h2>
            </div>
          </div>

          <div className="options">
            <div className="ajouter" onClick={rediriger}>
              <PersonAddAlt1Icon className="icon_ajout" />
              <span>Nouveau étudiant</span>
            </div>
            <div className="ajouter">ajout</div>
            <div className="ajouter">ajout</div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Recherche;
