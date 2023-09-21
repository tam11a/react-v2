import { GridColumns } from "@mui/x-data-grid";
import { IDataTable } from "@/types";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import useAreYouSure from "@/hooks/useAreYouSure";
import { useDeleteEmployee } from "@/queries/employees";

const DeleteButton: React.FC<{ id: number | string; permanent?: boolean }> = ({
  id,
  permanent = false,
}) => {
  const { mutateAsync: deleteEmployee } = useDeleteEmployee();

  const onDelete = async (id: any) => {
    message.open({
      type: "loading",
      content: permanent
        ? "Deleting Employee Permanently.."
        : "Deleting Employee..",
      duration: 0,
    });
    const res = await handleResponse(() =>
      deleteEmployee({
        id,
        params: {
          permanent: permanent || null,
        },
      })
    );

    message.destroy();

    if (res.status) {
      message.success(
        permanent
          ? "Employee deleted permanently!"
          : "Employee deleted successfully!"
      );
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const { contextHolder: delContextHolder, open: delOpen } = useAreYouSure({
    title: permanent ? "Delete Employee Permenently?" : "Delete Employee?",
    okText: "Delete",
    cancelText: "Cancel",
    color: "error",
  });

  return (
    <>
      {delContextHolder}
      <IconButton
        className="text-sm"
        color="error"
        onClick={() => {
          delOpen(
            () => onDelete(id),
            <>
              You are deleting a employee.
              <br />
              <br />
              Deleting a employee means the employee will
              {permanent ? " deleted forever" : " move to trash folder"} . After
              deleting, this work can't be undone.{" "}
              {permanent
                ? ""
                : " You'll have to restore the employee to use again"}
            </>
          );
        }}
        // disabled={!checkAccess(defaultPermissions.leadS.FULL)}
      >
        <p>Delete</p>
      </IconButton>
    </>
  );
};

//Restore Function

const RestoreButton: React.FC<{ id: number | string }> = ({ id }) => {
  const { mutateAsync: deleteEmployee } = useDeleteEmployee();

  const onRestore = async (id: any) => {
    message.open({
      type: "loading",
      content: "Restoring employee..",
      duration: 0,
    });
    const res = await handleResponse(() =>
      deleteEmployee({
        id,
        params: {
          restore: true,
        },
      })
    );
    message.destroy();
    if (res.status) {
      message.success("Employee restored successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };
  const { contextHolder: delContextHolder, open: delOpen } = useAreYouSure({
    title: "Restore Employee?",
    okText: "Restore",
    cancelText: "Cancel",
    color: "success",
  });
  return (
    <>
      {delContextHolder}
      <IconButton
        color="success"
        className="text-sm"
        onClick={() => {
          delOpen(
            () => onRestore(id),
            <>
              You are restoring a deleted <b>Employee</b>.
              <br />
              <br />
              After restoring the employee you can see it on the list again.
            </>
          );
        }}
        // disabled={!checkAccess(defaultPermissions.leadS.FULL)}
      >
        <p>Restore</p>
        {/* <Icon icon="bxs:trash" /> */}
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
      width: 200,
      minWidth: 180,
      // flex: 1,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (data: any) => (
        <>
          <IconButton
            className="text-sm"
            color="primary"
            onClick={() => navigate(`/app/employees/details/${data.row?.id}`)}
            // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
          >
            <p>view</p>
          </IconButton>
          {data?.row?.deleted_at ? (
            <>
              {/* Restore Button Here */}
              <RestoreButton id={data?.row?.id} />
              <DeleteButton id={data?.row?.id} permanent={true} />
            </>
          ) : (
            <DeleteButton id={data?.row?.id} />
          )}
        </>
      ),
    },
  ];
};

export default EmployeeColumn;
