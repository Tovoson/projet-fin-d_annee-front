import "./tableau.scss";
import { useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CheckIcon from "@mui/icons-material/Check";

import jsPDF from "jspdf";
import AxiosInstance from "../Axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { gererRetour } from "../gererMateriel";
import { formatDateAndTime } from "../../Tools/Tools";

const Tb2 = ({ myData, setAfficheModale, setId, val }) => {
  const navigate = useNavigate();

  const formattedData = useMemo(() => {
    return Array.isArray(myData)
      ? myData.map((item) => ({
          ...item,
          date_debut: formatDateAndTime(item.date_debut),
          date_fin_prevu: formatDateAndTime(item.date_fin_prevu),
        }))
      : []; // Retourne un tableau vide si myData est undefined ou n'est pas un tableau
  }, [myData]);

  const handleProlongerClick = (row) => {
    setAfficheModale(true);
    setId({
      idUtils: row.original.id_utils,
      idAdmin: row.original.id_admin,
      id_materiel: row.original.id_materiel,
    });
  };
  const handleRendu = (row) => {
    const resultat = gererRetour(row.original.id_utils);

    if (resultat.success) {
      navigate("../archive");
      toast.success("Matériel ajouté avec succès !", {
        autoClose: 3000, // Durée d'affichage en millisecondes
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(resultat.message);
    }
  };

  const handleGeneratePdf = (row) => {
    const doc = new jsPDF();

    // Définir des styles pour le PDF
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);

    // Ajouter un titre principal
    doc.text("Détails d'utilisation du matériel", 70, 10);

    // Définir des sous-sections et organiser les données
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);

    // Section : Informations administratives
    doc.text("Informations administratives", 10, 30);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`ID Utilisation : ${row.original.id_utils}`, 10, 40);
    doc.text(`ID Admin : ${row.original.id_admin}`, 10, 50);
    doc.text(`ID Matériel : ${row.original.id_materiel}`, 10, 60);

    // Ligne de séparation
    doc.line(10, 65, 200, 65);

    // Section : Détails de l'utilisation
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.text("Détails de l'utilisation", 10, 75);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Début d'utilisation : ${row.original.date_debut}`, 10, 85);
    doc.text(`Fin prévue : ${row.original.date_fin_prevu}`, 10, 95);
    doc.text(`Nombre de matériels : ${row.original.nombre}`, 10, 105);

    // Ligne de séparation
    doc.line(10, 110, 200, 110);

    // Section : Informations de l'étudiant
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.text("Informations de l'étudiant", 10, 120);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Matricule étudiant : ${row.original.matricule}`, 10, 130);
    doc.text(`Nom de l'étudiant : ${row.original.nom}`, 10, 140);
    doc.text(`Niveau : ${row.original.niveau}`, 10, 150);
    doc.text(`Téléphone : ${row.original.telephone}`, 10, 160);

    // Ajouter une bordure autour du contenu pour le styliser
    doc.setDrawColor(0, 0, 255); // Couleur bleue pour la bordure
    doc.rect(5, 5, 200, 170); // Rectange pour la bordure (position x, y, largeur, hauteur)

    // Télécharger le PDF avec un nom de fichier spécifique
    doc.save(`details_utilisation_${row.original.id_utils}.pdf`);
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "id_materiel",
        header: "id mat",
        size: 150,
      },
      {
        accessorKey: "matricule", //normal accessorKey
        header: "matricule",
        size: 200,
      },
      {
        accessorKey: "nom",
        header: "nom",
        size: 150,
      },
      {
        accessorKey: "telephone",
        header: "tel",
        size: 150,
      },
      {
        accessorKey: "niveau",
        header: "niveau",
        size: 150,
      },
      {
        accessorKey: "date_debut",
        header: "D debut",
        size: 150,
      },
      {
        accessorKey: "date_fin_prevu",
        header: "d fin",
        size: 150,
      },
      {
        accessorKey: "nombre",
        header: "nbr",
        size: 150,
      },
    ],
    []
  );

  return (
    <>
      {formattedData && formattedData.length > 0 ? (
        <MaterialReactTable
          columns={columns}
          data={formattedData}
          enableRowActions
          renderRowActions={({ row }) => (
            <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
              {val ? (
                ""
              ) : (
                <IconButton
                  color="secondary"
                  onClick={() => handleProlongerClick(row)}
                >
                  <EventRepeatIcon />
                </IconButton>
              )}
              <IconButton color="error" onClick={() => handleGeneratePdf(row)}>
                <PictureAsPdfIcon />
              </IconButton>
              {val ? (
                <span className="rendu">Rendu</span>
              ) : (
                <IconButton color="green" onClick={() => handleRendu(row)}>
                  <CheckIcon />
                </IconButton>
              )}
            </Box>
          )}
        />
      ) : (
        <p>Aucune donnée disponible</p>
      )}

      <ToastContainer />
    </>
  );
};
export default Tb2;
