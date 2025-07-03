import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Example = ({ myData, setAfficheModale, setId }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "nom_materiel", //access nested data with dot notation
        header: "materiel",
        size: 150,
      },
      {
        accessorKey: "nombre",
        header: "nombre",
        size: 150,
      },
      {
        accessorKey: "status",
        header: "status",
        size: 150,
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={myData}
      enableRowActions
      renderRowActions={({ row }) => (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          <IconButton
            color="secondary"
            component={Link}
            to={`/ModifierMateriel/${row.original.id_materiel}`}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              setAfficheModale(true);
              setId(row.original.id_materiel);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    />
  );
};

export default Example;
