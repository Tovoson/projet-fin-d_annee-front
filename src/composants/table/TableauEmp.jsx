
import { useEffect, useMemo} from 'react';
import {
  MaterialReactTable
} from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,

} from '@mui/icons-material';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Link } from 'react-router-dom';


const Tb2 = ({myData, setAfficheModale, setId}) => {
  
  const handleProlongerClick = (myId, dates) => {
    setAfficheModale(true);
    setId(myId);
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id_admin', //access nested data with dot notation
        header: 'id admin',
        size: 150,
      },
      {
        accessorKey: 'id_materiel',
        header: 'id mat',
        size: 150,
      },
      {
        accessorKey: 'matricule', //normal accessorKey
        header: 'matricule',
        size: 200,
      },
      {
        accessorKey: 'nom',
        header: 'nom',
        size: 150,
      },
      {
        accessorKey: 'telephone',
        header: 'tel',
        size: 150,
      },
      {
        accessorKey: 'niveau',
        header: 'niveau',
        size: 150,
      },
      {
        accessorKey: 'date_debut',
        header: 'D debut',
        size: 150,
      },
      {
        accessorKey: 'date_fin_prevu',
        header: 'd fin',
        size: 150,
      },
      {
        accessorKey: 'nombre',
        header: 'nbr',
        size: 150,
      },
      // {
      //   accessorKey: 'estRendu',
      //   header: 'status',
      //   size: 150,
      // },
    ],
    [],
  );

  
  return (
    <>
      {myData && myData.length > 0 ? (
        <MaterialReactTable 
          columns={columns} 
          data={myData}
          enableRowActions
          renderRowActions={({ row }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
              <IconButton
                color="secondary"
                // component={Link}
                // to={`/ModifierMateriel/${row.original.id_materiel}`}
                onClick={() => handleProlongerClick(row.original.id_utils)}
              >
                <EventRepeatIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  setAfficheModale(true);
                  setId(row);
                }}
              >
                <PictureAsPdfIcon />
              </IconButton>
            </Box>
          )}
        />
      ) : (
        <p>Aucune donnée disponible</p>
      )}
    </>
  );
  
}
export default Tb2;
