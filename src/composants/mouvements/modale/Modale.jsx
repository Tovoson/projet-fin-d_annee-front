import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import AxiosInstance from '../../Axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmationModal = ({afficheModale, onClose, val, id, actualiserData }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (id ) {
      console.log("idUtils:", id.idAdmin);
      console.log("Nom:", id.id_materiel);
      console.log("Téléphone:", id.idUtils);
    }
    console.log('rien')
  }, [id]);

  const handleConfirm = () => {
   
      AxiosInstance.put(`utilisation/${id.idUtils}/`,{
          id_admin : id.idAdmin,
          id_materiel : id.id_materiel,
          date_fin_prevu: inputValue
          }
          
      ).then(response => {
          console.log('Prolongation avec succès !', {
              autoClose: 3000, // Durée d'affichage en millisecondes
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
          });
          onClose();
      })
      .catch(error => {
          console.log('Erreur:', error.response.data);
          toast.error('Une erreur est survenue.', {
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });  // Affiche les détails de l'erreur
      });

    
  };

  const handleDelete = () => {
    AxiosInstance.delete(`materiel/${id}/`).then(() =>{
      toast.success('Suppression avec succès !', {
        autoClose: 3000, // Durée d'affichage en millisecondes
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
      onClose()
      actualiserData()
      console.log('data supprimé avec succès', id)
    })
    console.log(id)
    
  };

  return (
    <div>
      
      <Dialog open={afficheModale} onClose={onClose}>
        <DialogTitle>{ val ? 'Confirmez la prolongation' : 'Voulez-vous vraiment supprimer ?'}</DialogTitle>
        { val ?
          <DialogContent>
            <DialogContentText>
              Veuillez saisir le nouveau date et heure avant de confirmer.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              // label="Saisissez ici"
              type="datetime-local"
              fullWidth
              variant="outlined"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </DialogContent>
          : ''
        }
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={val ? handleConfirm : handleDelete} color={val ? "primary" : "warning"}>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default ConfirmationModal;
