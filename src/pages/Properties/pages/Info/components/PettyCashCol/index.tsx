import { GridColumns } from "@mui/x-data-grid";
import { IDataTable } from "@components/Datatable/types";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";

const PettyCashCol = (): GridColumns<IDataTable> => {
  const navigate = useNavigate();
  return [
    {
      headerName: "Lead Title",
      headerAlign: "center",
      field: "name",
      align: "center",
      // width: 200,
      flex: 1,
      sortable: false,
      // hide: true,
    },
    {
      headerName: "Assign Person",
      headerAlign: "center",
      field: "assigned_to",
      minWidth: 100,
      flex: 1,
      align: "center",
    },
    {
      headerName: "Status",
      headerAlign: "center",
      field: "status",
      minWidth: 100,
      flex: 1,
      align: "center",
    },
    {
      headerName: "Followup Date",
      headerAlign: "center",
      field: "followup_date",
      minWidth: 100,
      flex: 1,
      align: "center",
    },
    {
      headerName: "Source",
      headerAlign: "center",
      field: "media",
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

export default PettyCashCol;
