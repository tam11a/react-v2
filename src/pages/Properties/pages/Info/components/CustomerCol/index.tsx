import { GridColumns } from "@mui/x-data-grid";
import { IDataTable } from "@components/Datatable/types";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomerCol = (): GridColumns<IDataTable> => {
  const navigate = useNavigate();

  return [
    {
      headerName: "ID",
      headerAlign: "center",
      field: "id",
      align: "center",
      width: 80,
      //   flex: 1,
      sortable: false,
      // hide: true,
    },
    {
      headerName: "Customer Name",
      headerAlign: "center",
      field: "name",
      minWidth: 200,
      //   flex: 1,
      align: "center",
      renderCell: (data: any) => (
        <>{`${data.row.first_name} ${data.row.last_name}`}</>
      ),
    },
    {
      headerName: "Email",
      headerAlign: "center",
      field: "email",
      minWidth: 150,
      //   flex: 1,
      align: "center",
    },
    {
      headerName: "Phone",
      headerAlign: "center",
      field: "phone",
      minWidth: 100,
      flex: 1,
      align: "center",
    },

    {
      headerName: "Priority",
      headerAlign: "center",
      field: "priority",
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
            color="primary"
            onClick={() => navigate(`/app/leads/details/${data.row?.id}`)}
            className="text-sm"
            // disabled={!checkAccess(defaultPermissions.leadS.FULL)}
          >
            <p>View</p>
          </IconButton>
        </>
      ),
    },
  ];
};

export default CustomerCol;
