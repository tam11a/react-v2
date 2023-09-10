import { GridColumns } from "@mui/x-data-grid";
import { IDataTable } from "@/types";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useDeleteEmployee } from "@/queries/employees";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import useAreYouSure from "@/hooks/useAreYouSure";

const DeleteButton: React.FC<{ id: number | string }> = ({ id }) => {
  const { mutateAsync: deleteEmployee } = useDeleteEmployee();

  const onDelete = async (id: any) => {
    message.open({
      type: "loading",
      content: "Deleting Employee..",
      duration: 0,
    });
    const res = await handleResponse(() => deleteEmployee({ id }));

    message.destroy();
    if (res.status) {
      message.success("Employee deleted successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const { contextHolder: delContextHolder, open: delOpen } = useAreYouSure({
    title: "Delete Employee?",
    okText: "Delete",
    cancelText: "Cancel",
    color: "error",
  });
  return (
    <>
      {delContextHolder}
      <IconButton
        sx={{ fontSize: "large" }}
        color="error"
        onClick={() => {
          delOpen(
            () => onDelete(id),
            <>
              You are deleting a employee.
              <br />
              <br />
              Deleting a employee means the employee will move to trash folder.
              After deleting, this work can't be undone. You'll have to restore
              the employee to use again
            </>
          );
        }}
        // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
      >
        <Icon icon="bxs:trash" />
      </IconButton>
    </>
  );
};

const EmployeeColumn = (): GridColumns<IDataTable> => {
  const navigate = useNavigate();

  return [
    {
      headerName: "ID",
      headerAlign: "center",
      field: "id",
      align: "center",
      // width: 200,
      flex: 1,
      sortable: false,
      // hide: true,
    },
    {
      headerName: "Employee Title",
      headerAlign: "center",
      field: "firstName",
      align: "center",
      width: 250,
      minWidth: 200,
      flex: 1,
      renderCell: (data: any) => `${data.row.first_name} ${data.row.last_name}`,
    },
    {
      headerName: "Designation",
      headerAlign: "center",
      field: "assignee",
      align: "center",
      width: 250,
      minWidth: 200,
      flex: 1,
      renderCell: (data: any) =>
        `${
          data.row.role?.name ? data.row.role?.name : "No Designation Assigned"
        } 
        ${data?.row.role?.prefix ? ` - ${data.row?.role?.prefix}` : ""}`,
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
      minWidth: 200,
      flex: 1,
      align: "center",
    },
    {
      headerName: "Gender",
      headerAlign: "center",
      field: "gender",
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
            onClick={() => navigate(`/app/employees/details/${data.row?.id}`)}
            // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
          >
            <Icon icon="icon-park-solid:info" />
          </IconButton>
          <DeleteButton id={data?.row?.id} />
        </>
      ),
    },
  ];
};

export default EmployeeColumn;
