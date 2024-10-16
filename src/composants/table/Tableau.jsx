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

function createData(Matr, Nom, niveau,role, tel, dates) {
  return { Matr, Nom, niveau, tel, role, dates };
}

const rows = [
  createData('2296', 'Mara Tovoson', "M1",'Etudiant', 23421, 2024),
  createData('Ice cream sandwich', 237, 9.0,'enseignant', 37, 4.3),
  
];

export default function DenseTable() {
    const navigate = useNavigate()
  const handleEditClick = (Matr, Nom, niveau, role, tel) => {
    // Rediriger vers la page d'édition et passer les données via `state`
    navigate(`../nouveau_etudiant`, { 
        state: { 
            Matric: Matr,
            Noms: Nom,
            niveaux: niveau,
            roles : role,
            tels : tel
        }
    });

};

  return (
    <TableContainer 
      component={Paper} 
    >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Matricule</TableCell>
            <TableCell align="right">Nom</TableCell>
            <TableCell align="right">Niveau</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Date d'enr</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Matr}
              </TableCell>
              <TableCell align="right">{row.Nom}</TableCell>
              <TableCell align="right">{row.niveau}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">{row.tel}</TableCell>
              <TableCell align="right">{row.dates}</TableCell>
              <TableCell align="right">
                <Button variant="contained" className='btn_modifier'onClick={handleEditClick(row.Matr, row.Nom, row.niveau, row.role, row.tel )}>Modifier</Button>&nbsp;
                <Button variant="contained" className='btn_suppr'>Supprimer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
