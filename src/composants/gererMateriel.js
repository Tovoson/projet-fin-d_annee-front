import AxiosInstance from "./Axios";

export const creerUtilisation = async (donnees) => {
  try {
    // 1. Vérifier la disponibilité du matériel
    console.log(donnees.id_materiels)
    if (!donnees.id_materiels) {
      throw new Error('ID du matériel non spécifié');
    }

    const idMateriel = donnees.id_materiels.toString().trim();
    console.log('ID Matériel:', idMateriel); // Pour debug

    const responseMateriel = await AxiosInstance.get(`materiel/${idMateriel}/`); // Suppression du slash final
    const materiel = responseMateriel.data;

    if (!materiel) {
      throw new Error('Matériel non trouvé');
    }

    // Convertir les nombres en entiers pour la comparaison
    const nombreDemande = parseInt(donnees.nombre);
    const nombreDisponible = parseInt(materiel.nombre);

    if (isNaN(nombreDemande) || isNaN(nombreDisponible)) {
      throw new Error('Valeurs numériques invalides');
    }

    // 2. Vérifier si l'emprunt est possible
    if (nombreDemande > nombreDisponible || nombreDemande <= 0) {
    //   throw new Error('Nombre de matériel demandé non disponible');
      alert('Nombre de matériel demandé non disponible');
    }

    // console.log(materiel)
    const {id_materiel, date_creation, id_admin,nom_materiel,nombre,status} = materiel
    const nouveauNombre = (nombreDisponible - nombreDemande).toString();
    await AxiosInstance.put(`materiel/${idMateriel}/`, { 
      date_creation,
      id_admin,
      nom_materiel,
      nombre: nouveauNombre,
      status: nouveauNombre === '0' ? 'indisponible' : 'disponible'
    });

    // 4. Créer l'utilisation
    console.log(donnees)
    
    const utilisation = await AxiosInstance.post('utilisation/', { 
      ...donnees,
      id_materiel : donnees.id_materiels,
      dateRendu: null,
      estRendu: false
    });

    return {
      success: true,
      message: 'Emprunt effectué avec succès',
      utilisation: utilisation.data
    };

  } catch (error) {
    console.error('Erreur détaillée:', error); // Pour debug
    return {
      success: false,
      message: error.message || 'Erreur lors de l\'emprunt',
      error
    };
  }
};

export const gererRetour = async (idUtils) => {
  try {
    if (!idUtils) {
      throw new Error('ID utilisation non spécifié');
    }

    // 1. Récupérer les informations de l'utilisation
    const responseUtils = await AxiosInstance.get(`utilisation/${idUtils}`); // Modification du chemin
    const utilisation = responseUtils.data;

    if (!utilisation) {
      throw new Error('Utilisation non trouvée');
    }

    // 2. Récupérer les informations du matériel
    const responseMateriel = await AxiosInstance.get(`materiel/${utilisation.id_materiel}`); // Modification du chemin
    const materiel = responseMateriel.data;

    if (!materiel) {
      throw new Error('Matériel non trouvé');
    }

    // 3. Calculer le nouveau nombre
    const nouveauNombre = (parseInt(materiel.nombre) + parseInt(utilisation.nombre)).toString();

    // 4. Mettre à jour le matériel
    await AxiosInstance.put(`materiel/${utilisation.id_materiel}`, { // Modification du chemin
      ...materiel,
      nombre: nouveauNombre,
      status: 'disponible'
    });

    // 5. Mettre à jour l'utilisation
    await AxiosInstance.put(`utilisation/${idUtils}`, { // Modification du chemin
      ...utilisation,
      estRendu: true,
      dateRendu: new Date().toISOString()
    });

    return {
      success: true,
      message: 'Retour effectué avec succès'
    };

  } catch (error) {
    console.error('Erreur détaillée:', error); // Pour debug
    return {
      success: false,
      message: error.message || 'Erreur lors du retour',
      error
    };
  }
};