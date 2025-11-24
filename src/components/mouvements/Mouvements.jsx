import React, { useEffect, useState } from "react";
import ConfirmationModal from "./modale/Modale";
import Stat from "../stat/Stat";
import Tb2 from "../table/TableauEmp";
import { creerUtilisation } from "../gererMateriel";
import Header from "../Header";
import { tableauObjets } from "../../data/data";
import { Button } from "@mui/material";

const Mouvements = () => {
  const [afficheModale, setAfficheModale] = useState(false);

  const [formData, setFormData] = useState({
    matricule: "",
    nom: "",
    telephone: "",
    niveau: "",
    nombre: "1",
    date_debut: "",
    date_fin_prevu: "",
    id_materiels: "",
  });

  const [myData, setMyData] = useState(tableauObjets);
  const [myAllData, setAllMyData] = useState(tableauObjets);
  const [Id, setId] = useState("");
  const [Id2, setId2] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const val = true;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdminData(JSON.parse(storedAdmin));
    }
  }, []);

  const handleFermerModale = () => {
    setAfficheModale(false);
  };
  const handleReset = () => {
    setFormData({
      matricule: "",
      nom: "",
      telephone: "",
      niveau: "",
      nombre: "1",
      date_debut: "",
      id_materiels: myData[0]?.id_materiel || "",
    });
  };

  const GetAllData = () => {
    /* AxiosInstance.get("utilisation/")
      .then((res) => {
        setAllMyData(res.data.non_rendus);
      })
      .catch((error) => {
        console.error("Erreur dans GetAllData:", error);
      }); */
  };

  const GetData = () => {
    /*  AxiosInstance.get("materiel/")
      .then((res) => {
        setMyData(res.data);
        // Initialiser id_materiels avec le premier matériel si disponible
        if (res.data && res.data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            id_materiels: res.data[0].id_materiel,
          }));
        }
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des matériels:", error);
        setError("Erreur lors du chargement des matériels");
      }); */

    setMyData(tableauObjets);
  };

  useEffect(() => {
    GetData();
    GetAllData();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    setError("");

    if (!formData.id_materiels) {
      setError("Veuillez sélectionner un matériel");
      setLoading(false);
      return;
    }

    if (
      !formData.matricule ||
      !formData.nom ||
      !formData.telephone ||
      !formData.date_debut ||
      !formData.date_fin_prevu
    ) {
      setError("Veuillez remplir tous les champs obligatoires");
      setTimeout(() => {
        setError("");
      }, 2000);

      setLoading(false);
      return;
    }

    const donnees = {
      ...formData,
      id_admin: adminData?.id_admin,
    };

    console.log(donnees.id_materiels);
    const resultat = await creerUtilisation(donnees);

    if (resultat.success) {
      //   onSuccess && onSuccess();
      // Réinitialiser le formulaire
      setFormData({
        matricule: "",
        nom: "",
        telephone: "",
        niveau: "",
        nombre: "1",
        date_debut: "",
        id_materiels: myData[0]?.id_materiel || "",
      });
    } else {
      setError(resultat.message);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className=" h-screen overflow-y-auto">
      <Header />
      <div className="w-auto m-5 pb-5 rounded-2xl shadow-md">
        <div className="flex h-full items-center justify-around">
          <div className="grid m-3 p-3 grid-rows-4 items-center justify-center gap-4 flex-col">
            <select
              id="device"
              name="id_materiels"
              value={formData.id_materiels}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full shadow-md rounded-2xl focus:outline-none"
            >
              {myData &&
                myData.length > 0 &&
                myData.map((myD) => (
                  <option value={myD.id} key={myD.id}>
                    {myD.nom_materiel}
                  </option>
                ))}
            </select>
            <input
              type="datetime-local"
              name="date_debut"
              value={formData.date_debut}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full shadow-md rounded-2xl focus:outline-none"
            />
            <input
              type="datetime-local"
              className="border border-gray-300 p-3 w-full shadow-md rounded-2xl focus:outline-none"
              name="date_fin_prevu"
              value={formData.date_fin_prevu}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full shadow-md rounded-2xl focus:outline-none"
            />
          </div>

          <div className="grid grid-col-4 gap-3 m-3 p-3">
            <input
              type="text"
              placeholder="Matricule"
              name="matricule"
              value={formData.matricule}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full shadow-md rounded-2xl focus:outline-none"
            />
            <input
              type="text"
              placeholder="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full shadow-md rounded-2xl focus:outline-none"
            />
            <select
              id="device"
              name="niveau"
              value={formData.niveau}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full shadow-md rounded-2xl focus:outline-none"
            >
              <option value="L1">L1</option>
              <option value="L2">L2</option>
              <option value="L3">L3</option>
              <option value="M1">M1</option>
              <option value="M2">M2</option>
            </select>
            <input
              type="tel"
              name="telephone"
              placeholder="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full shadow-md rounded-2xl focus:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button variant="contained" onClick={handleSubmit}>
            {loading ? "En cours..." : "Valider"}
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#d0e1ff", color: "#1a3d7c" }}
            onClick={handleReset}
          >
            Reinitialiser
          </Button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
      <div className="my-5 px-10">
        <Tb2
          myData={myAllData}
          setAfficheModale={setAfficheModale}
          setId={setId2}
        />
      </div>
      <div className="my-5 px-10">

      <Stat />
      </div>

      {afficheModale ? (
        <ConfirmationModal
          afficheModale={afficheModale}
          onClose={handleFermerModale}
          val={val}
          id={Id2}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Mouvements;