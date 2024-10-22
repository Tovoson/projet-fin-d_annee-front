import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GenererPDF from '../genererPDF/GenererPDF';
import './tableau.scss'

function createData2(idEmp, NomE, NomM, nbr, dateEnr, dateREt, stat) {
  return {idEmp, NomE, NomM, nbr, dateEnr, dateREt, stat };
}


const row2 = [
  createData2(1,'Tovo', 'Projecteur', 6, '12h', '15h', 'en attente'),
  createData2(2,'Tovo', 'Projecteur', 6, '12h', '15h', 'en attente'),
  createData2(3,'Tovo', 'Projecteur', 6, '12h', '15h', 'en attente'),
  createData2(4,'Tovo', 'Projecteur', 6, '12h', '15h', 'en attente'),
  
  
];


export default function TableauEmprunt({setAfficheModale, val}) {
    const [affiche, setAffiche] = React.useState(null)
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

    const handleDotsClick = (id) => {
        setAffiche((prev) => (prev === id ? null : id))
    }

    const handleProlongerClick = () => {
        setAfficheModale(true);
    }

    

  return (
    
    <TableContainer 
      component={Paper} 
    >
      <Table sx={{ Width: 500 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Id Emp </TableCell>
            <TableCell>NomEt </TableCell>
            <TableCell align="right">Nom du matériel</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">DateEnr</TableCell>
            <TableCell align="right">Date retour</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="center">Actions</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody >
          {row2.map((rows2) => (
            <TableRow
              key={rows2.idEmp}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {rows2.idEmp}
              </TableCell>
              <TableCell align="right">{rows2.NomE}</TableCell>
              <TableCell align="right">{rows2.NomM}</TableCell>
              <TableCell align="right">{rows2.nbr}</TableCell>
              <TableCell align="right">{rows2.dateEnr}</TableCell>
              <TableCell align="right">{rows2.dateREt}</TableCell>
              <TableCell align="right">{rows2.stat}</TableCell>
              <TableCell align="right" className='action'>
                
                { val 
                  ?
                    <div onClick={() => handleDotsClick(rows2.idEmp)} className='dots'>
                      <MoreVertIcon />
                    </div> 
                  : <span className='pdf' onClick={() => {<GenererPDF />}}>Générer pdf</span>
                }
                { affiche === rows2.idEmp &&
                    (<div className="btn">
                        
                        <span>Rendu</span>
                        <span onClick={() => handleProlongerClick()}>Prolonger</span>                     
                        <span onClick={() => {<GenererPDF />}}>Générer pdf</span>
                    </div>)
                
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  );
}
