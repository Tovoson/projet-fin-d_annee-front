import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';

const ConfirmationModal = ({afficheModale, onClose}) => {
  const [inputValue, setInputValue] = useState('');

  const handleConfirm = () => {
    console.log('Valeur saisie :', inputValue);
    
  };

  return (
    <div>
      
      <Dialog open={afficheModale} onClose={onClose}>
        <DialogTitle>Confirmez la prolongation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez saisir le nouveau heure avant de confirmer.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Saisissez ici"
            type="text"
            fullWidth
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationModal;
