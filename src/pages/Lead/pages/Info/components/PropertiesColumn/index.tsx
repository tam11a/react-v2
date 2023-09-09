import { IDataTable } from "@/types";
import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const PropertiesColumn = (): GridColumns<IDataTable> => {
  const navigate = useNavigate();
  return [
    {
      headerName: "Property by ID",
      headerAlign: "center",
      field: "id",
      align: "center",
      // width: 200,
      flex: 1,
      sortable: false,
      // hide: true,
    },
    {
      headerName: "Type",
      headerAlign: "center",
      field: "type",
      minWidth: 100,
      flex: 1,
      align: "center",
    },
    {
      headerName: "Location",
      headerAlign: "center",
      field: "location",
      minWidth: 100,
      flex: 1,
      align: "center",
    },
    {
      headerName: "Action",
      field: "action",
      width: 100,
      minWidth: 80,
      // flex: 1,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (data: any) => (
        <>
          <IconButton
            sx={{ fontSize: "large" }}
            color="primary"
            onClick={() => navigate(`/app/leads/details/${data.row?.id}`)}
            // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
          >
            <Icon icon="icon-park-solid:info" />
          </IconButton>
        </>
      ),
    },
  ];
};

export default PropertiesColumn;
