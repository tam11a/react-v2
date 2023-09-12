import useAreYouSure from "@/hooks/useAreYouSure";
import { useDeleteRole } from "@/queries/roles";
import handleResponse from "@/utilities/handleResponse";
import { IDataTable } from "@components/Datatable/types";
import { message } from "@components/antd/message";
import Iconify from "@components/iconify";
import { IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";

const DeleteButton: React.FC<{ id: number | string; permanent?: boolean }> = ({
  id,
  permanent = false,
}) => {
  const { mutateAsync: deleteLead } = useDeleteRole();

  const onDelete = async (id: any) => {
    message.open({
      type: "loading",
      content: permanent ? "Deleting Role Permanently.." : "Deleting Role..",
      duration: 0,
    });
    const res = await handleResponse(() =>
      deleteLead({
        id,
        params: {
          permanent: permanent || null,
        },
      })
    );

    message.destroy();

    if (res.status) {
      message.success(
        permanent ? "Role deleted permanently!" : "Role deleted successfully!"
      );
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const { contextHolder: delContextHolder, open: delOpen } = useAreYouSure({
    title: permanent ? "Delete Role Permanently?" : "Delete Role?",
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
              You are deleting a lead.
              <br />
              <br />
              Deleting a lead means the lead will
              {permanent ? " deleted forever" : " move to trash folder"} . After
              deleting, this work can't be undone.{" "}
              {permanent ? "" : " You'll have to restore the lead to use again"}
            </>
          );
        }}
        // disabled={!checkAccess(defaultPermissions.leadS.FULL)}
      >
        <Iconify icon="bxs:trash" />
      </IconButton>
    </>
  );
};

const RolesColumn = (): GridColumns<IDataTable> => {
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
      headerName: "Role Name",
      headerAlign: "center",
      field: "name",
      align: "center",
      width: 200,
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: "Prefix",
      headerAlign: "center",
      field: "prefix",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
    },

    {
      headerName: "Description",
      headerAlign: "center",
      field: "description",
      align: "center",
      flex: 1,
      width: 160,
      minWidth: 150,
    },
    {
      headerName: "Assigned Employee",
      headerAlign: "center",
      field: "total_employees",
      width: 200,
      minWidth: 200,
      flex: 1,
      align: "center",
    },
    {
      headerName: "Total Permission",
      headerAlign: "center",
      field: "total_permissions",
      minWidth: 100,
      flex: 1,
      align: "center",
    },
    {
      headerName: "Status",
      headerAlign: "center",
      field: "is_active",
      minWidth: 100,
      flex: 1,
      align: "center",
      renderCell: (data: any) => (
        <>
          <Tag color={`${data?.row?.is_active ? "#36b336" : "#b1160d"}`}>
            {data?.row?.is_active ? "Active" : "Inactive"}
          </Tag>
        </>
      ),
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
            onClick={() => navigate(`/app/roles/details/${data.row?.id}`)}
            // disabled={!checkAccess(defaultPermissions.leadS.FULL)}
          >
            <Iconify icon="icon-park-solid:info" />
          </IconButton>
          {data?.row?.deleted_at ? (
            <>
              {/* Restore Button Here */}
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

export default RolesColumn;
