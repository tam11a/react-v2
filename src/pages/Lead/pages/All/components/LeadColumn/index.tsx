import { GridColumns } from "@mui/x-data-grid";
import { IDataTable } from "@/types";

const LeadColumn = (): GridColumns<IDataTable> => {
  return [
    {
      headerName: "ID",
      headerAlign: "center",
      field: "_id",
      align: "center",
      width: 200,
      // flex: 1,
      sortable: false,
      hide: true,
    },
    {
      headerName: "Lead Title",
      headerAlign: "center",
      field: "firstName",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
      renderCell: (data: any) => `${data.row.firstName} ${data.row.lastName}`,
    },

    {
      headerName: "Phone",
      headerAlign: "center",
      field: "phone",
      align: "center",
      flex: 1,
      width: 160,
      minWidth: 150,
    },
    {
      headerName: "Email",
      headerAlign: "center",
      field: "email",
      width: 250,
      minWidth: 250,
      flex: 1.5,
      align: "center",
    },
    {
      headerName: "Gender",
      headerAlign: "center",
      field: "gender",
      width: 250,
      minWidth: 250,
      flex: 1.5,
      align: "center",
    },
    {
      headerName: "Priority",
      headerAlign: "center",
      field: "priority",
      width: 250,
      minWidth: 250,
      flex: 1.5,
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
    },
  ];
};

export default LeadColumn;
