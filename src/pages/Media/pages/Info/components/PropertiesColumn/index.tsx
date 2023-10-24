import { IDataTable } from "@/types";
import { IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const PropertiesColumn = (): GridColumns<IDataTable> => {
  const navigate = useNavigate();
  return [
    {
      headerName: "Property ID",
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
      field: "address.area",
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
            className="text-sm"
            color="primary"
            onClick={() => navigate(`/app/properties/details/${data.row?.id}`)}
            // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
          >
            View
          </IconButton>
        </>
      ),
    },
  ];
};

export default PropertiesColumn;
