import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function createData(Id, Nom, nbr, status, date) {
  return { Id, Nom, nbr, status, date };
}

const rows = [
  createData('1', 'Projecteur', 6, 'dispo', 2024),
  createData('2', "stylo",3, 'nonDispo', 2022),
  
];



export default function DenseTable({IdMat, Nom, Nombre, Status, DateEnr}) {
    const navigate = useNavigate()
    const handleEditClick = (Nom, nbr, status) => {
      // Rediriger vers la page d'édition et passer les données via `state`
      navigate(`../nouveau_etudiant`, { 
          state: { 
              noms: Nom,
              nbrs : nbr,
              stat : status
          }
      });

      console.log("state envoyé")

    };

  return (
    <TableContainer 
      component={Paper} 
    >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{IdMat}</TableCell>
            <TableCell align="right">{Nom}</TableCell>
            <TableCell align="right">{Nombre}</TableCell>
            <TableCell align="right">{Status}</TableCell>
            <TableCell align="right">{DateEnr}</TableCell>

            <TableCell align="center">Actions</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody >
          {rows.map((row) => (
            <TableRow
              key={row.Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Id}
              </TableCell>
              <TableCell align="right">{row.Nom}</TableCell>
              <TableCell align="right">{row.nbr}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">
                <Button variant="contained" className='btn_modifier'onClick={() => handleEditClick(row.Nom, row.nbr, row.status )}>Modifier</Button>&nbsp;
                <Button variant="contained" className='btn_suppr'>Supprimer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

