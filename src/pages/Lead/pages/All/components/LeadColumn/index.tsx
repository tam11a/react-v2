import { GridColumns } from "@mui/x-data-grid";
import { IDataTable } from "@/types";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useDeleteLead } from "@/queries/leads";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import useAreYouSure from "@/hooks/useAreYouSure";

const DeleteButton: React.FC<{ id: number | string }> = ({ id }) => {
  const { mutateAsync: deleteLead } = useDeleteLead();

  const onDelete = async (id: any) => {
    message.open({
      type: "loading",
      content: "Deleting Lead..",
      duration: 0,
    });
    const res = await handleResponse(() => deleteLead({ id }));

    message.destroy();
    if (res.status) {
      message.success("Lead deleted successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const { contextHolder: delContextHolder, open: delOpen } = useAreYouSure({
    title: "Delete Lead?",
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
              Deleting a lead means the lead will move to trash folder. After
              deleting, this work can't be undone. You'll have to restore the
              lead to use again
            </>
          );
        }}
        // disabled={!checkAccess(defaultPermissions.leadS.FULL)}
      >
        <Icon icon="bxs:trash" />
      </IconButton>
    </>
  );
};

const LeadColumn = (): GridColumns<IDataTable> => {
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
      headerName: "Lead Title",
      headerAlign: "center",
      field: "firstName",
      align: "center",
      width: 200,
      minWidth: 150,
      flex: 1,
      renderCell: (data: any) => `${data.row.first_name} ${data.row.last_name}`,
    },
    {
      headerName: "Assign Person",
      headerAlign: "center",
      field: "assignee",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
      renderCell: (data: any) =>
        `${data.row.assignee?.first_name} ${data.row.assignee?.last_name}`,
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
      width: 200,
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
      headerName: "Priority",
      headerAlign: "center",
      field: "priority",
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
      renderCell: (data: any) => `${data.row.status.label}`,
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
            // disabled={!checkAccess(defaultPermissions.leadS.FULL)}
          >
            <Icon icon="icon-park-solid:info" />
          </IconButton>
          <DeleteButton id={data?.row?.id} />
        </>
      ),
    },
  ];
};

export default LeadColumn;
