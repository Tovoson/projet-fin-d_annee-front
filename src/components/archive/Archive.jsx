import React, { useEffect, useState } from "react";
import "./archive.scss";
import Recherche from "../recherche/Recherche";
import Stat from "../stat/Stat";
import Tb2 from "../table/TableauEmp";
import AxiosInstance from "../Axios";

const Archive = () => {
  const [myAllData, setAllMyData] = useState();

  const GetAllData = () => {
    AxiosInstance.get("utilisation/")
      .then((res) => {
        console.log(res.data);
        setAllMyData(res.data.rendus);
        // setLoading(false)
      })
      .catch((error) => {
        console.error("Erreur dans GetAllData:", error);
      });
  };

  useEffect(() => {
    GetAllData();
  }, []);

  const listes = [
    {
      id: 1,
      img: "./icons8-tous-96.png",
      nbr: 20,
      texte: "matériel emprunté le plus",
    },
    {
      id: 2,
      img: "./icons8-ok-188.png",
      nbr: 40,
      texte: "étudiant qui emprunte le plus",
    },
    {
      id: 3,
      img: "./icons8-en-attente-100.png",
      nbr: 70,
      texte: "admin qui fait emprunter le plus",
    },
  ];

  return (
    <div className="contenu">
      <div className="enTete">
        <h2>Liste des archives</h2>
      </div>
      <div className="tableau">
        <Tb2
          myData={myAllData}
          // setAfficheModale = {setAfficheModale}
          val={true}
        />
      </div>
      <div className="stat">
        <Stat listes={listes} />
      </div>
    </div>
  );
};

export default Archive;
