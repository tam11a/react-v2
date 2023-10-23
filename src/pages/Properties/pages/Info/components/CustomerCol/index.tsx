import { GridColumns } from "@mui/x-data-grid";
import { IDataTable } from "@components/Datatable/types";

const CustomerCol = (): GridColumns<IDataTable> => {
  return [
    {
      headerName: "Date",
      headerAlign: "center",
      field: "date",
      align: "center",
      // width: 200,
      flex: 1,
      sortable: false,
      // hide: true,
    },
    {
      headerName: "Lead Id",
      headerAlign: "center",
      field: "lead_id",
      minWidth: 100,
      flex: 1,
      align: "center",
    },
    {
      headerName: "Expanse Purpose",
      headerAlign: "center",
      field: "status",
      minWidth: 100,
      flex: 1,
      align: "center",
    },
    {
      headerName: "Amount",
      headerAlign: "center",
      field: "amount",
      minWidth: 100,
      flex: 1,
      align: "center",
    },
  ];
};

export default CustomerCol;
