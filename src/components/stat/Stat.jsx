import React, { useEffect, useState } from "react";
import "./stat.scss";
import AxiosInstance from "../Axios";

function Stat() {
  const [myData, setMyData] = useState();
  const [admin, setAdmin] = useState();
  const [utilisateur, setUtils] = useState();
  const [loading, setLoading] = useState(true);

  const GetData1 = () => {
    AxiosInstance.get("/utilisation/materiels-plus-utilises/").then((res) => {
      setMyData(res.data);
      setLoading(false);
    });
  };

  const GetData2 = () => {
    AxiosInstance.get("/utilisation/admin-plus-actif/").then((res) => {
      setAdmin(res.data);
      setLoading(false);
    });
  };
  const GetData3 = () => {
    AxiosInstance.get("/utilisation/utilisateur-plus-frequent/").then((res) => {
      setUtils(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {}, []);

  return (
    <div className="composant1">
      <div className="Tous">
        <img src="./icons8-tous-96.png" alt="" />
        <div className="texte">
          <span>{myData ? `${myData.utilisations} utilisations` : ""}</span>
          <span>{myData?.nom || "Chargement..."}</span>
        </div>
      </div>

      <div className="Tous">
        <img src="./icons8-ok-188.png" alt="" />
        <div className="texte">
          <span>{loading ? "Chargement..." : utilisateur?.nom}</span>
          <span>
            {loading ? "" : `${utilisateur?.utilisations} utilisations`}
          </span>
        </div>
      </div>

      <div className="Tous">
        <img src="./icons8-en-attente-100.png" alt="" />
        <div className="texte">
          <span>{loading ? "Chargement..." : admin?.nom}</span>
          <span>{loading ? "" : `${admin?.nombre_gestions} gestions`}</span>
        </div>
      </div>
    </div>
  );
}

export default Stat;
