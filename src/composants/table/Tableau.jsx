// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// function createData(Id, Nom, nbr, status, date) {
//   return { Id, Nom, nbr, status, date };
// }

// const rows = [
//   createData('1', 'Projecteur', 6, 'dispo', 2024),
//   createData('2', "stylo",3, 'nonDispo', 2022),
  
// ];



// export default function DenseTable({IdMat, Nom, Nombre, Status, DateEnr}) {
//     const navigate = useNavigate()
//     const handleEditClick = (Nom, nbr, status) => {
//       // Rediriger vers la page d'édition et passer les données via `state`
//       navigate(`../nouveau_etudiant`, { 
//           state: { 
//               noms: Nom,
//               nbrs : nbr,
//               stat : status
//           }
//       });

//       console.log("state envoyé")

//     };

//   return (
//     <TableContainer 
//       component={Paper} 
//     >
//       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//         <TableHead>
//           <TableRow>
//             <TableCell>{IdMat}</TableCell>
//             <TableCell align="right">{Nom}</TableCell>
//             <TableCell align="right">{Nombre}</TableCell>
//             <TableCell align="right">{Status}</TableCell>
//             <TableCell align="right">{DateEnr}</TableCell>

//             <TableCell align="center">Actions</TableCell> 
//           </TableRow>
//         </TableHead>
//         <TableBody >
//           {rows.map((row) => (
//             <TableRow
//               key={row.Id}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.Id}
//               </TableCell>
//               <TableCell align="right">{row.Nom}</TableCell>
//               <TableCell align="right">{row.nbr}</TableCell>
//               <TableCell align="right">{row.status}</TableCell>
//               <TableCell align="right">{row.date}</TableCell>
//               <TableCell align="right">
//                 <Button variant="contained" className='btn_modifier'onClick={() => handleEditClick(row.Nom, row.nbr, row.status )}>Modifier</Button>&nbsp;
//                 <Button variant="contained" className='btn_suppr'>Supprimer</Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';


const Example = ({myData}) => {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'nom_materiel', //access nested data with dot notation
        header: 'materiel',
        size: 150,
      },
      {
        accessorKey: 'nombre',
        header: 'nombre',
        size: 150,
      },
      {
        accessorKey: 'id_admin', //normal accessorKey
        header: 'admin',
        size: 200,
      },
      {
        accessorKey: 'status',
        header: 'status',
        size: 150,
      }
    ],
    [],
  );

  // const table = useMaterialReactTable({
  //   columns,
  //   myData, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  // });

  return (
    <MaterialReactTable 
      columns={columns} 
      data={myData}
      enableRowActions
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
          <IconButton
            color="secondary"
            component={Link}
            to = {`/ModifierMateriel/${row.original.id_materiel}`}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              data.splice(row.index, 1); //assuming simple data table
              setData([...data]);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    />
  )
};

export default Example;
