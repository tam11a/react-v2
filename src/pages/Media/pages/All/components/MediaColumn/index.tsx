import { GridColumns } from "@mui/x-data-grid";
import { IDataTable } from "@/types";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import useAreYouSure from "@/hooks/useAreYouSure";
import { useDeleteMedia } from "@/queries/media";

const DeleteButton: React.FC<{ id: number | string; permanent?: boolean }> = ({
  id,
  permanent = false,
}) => {
  const { mutateAsync: deleteMedia } = useDeleteMedia();

  const onDelete = async (id: any) => {
    message.open({
      type: "loading",
      content: permanent ? "Deleting Media Permanently.." : "Deleting Media..",
      duration: 0,
    });
    const res = await handleResponse(() =>
      deleteMedia({
        id,
        params: {
          permanent: permanent || null,
        },
      })
    );

    message.destroy();

    if (res.status) {
      message.success(
        permanent ? "Media deleted permanently!" : "Media deleted successfully!"
      );
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const { contextHolder: delContextHolder, open: delOpen } = useAreYouSure({
    title: permanent ? "Delete Media Permenently?" : "Delete Media?",
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
              You are deleting a Media.
              <br />
              <br />
              Deleting a Media means the Media will
              {permanent ? " deleted forever" : " move to trash folder"} . After
              deleting, this work can't be undone.{" "}
              {permanent
                ? ""
                : " You'll have to restore the Media to use again"}
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

const RestoreButton: React.FC<{ id: number | string; permanent?: boolean }> = ({
  id,
  permanent = false,
}) => {
  const { mutateAsync: RestoreMedia } = useDeleteMedia();

  const onRestore = async (id: any) => {
    message.open({
      type: "loading",
      content: "Restoring Media",
      duration: 0,
    });
    const res = await handleResponse(() =>
      RestoreMedia({
        id,
        params: {
          restore: true,
        },
      })
    );
    message.destroy();
    if (res.status) {
      message.success("Media restored successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };
  const { contextHolder: delContextHolder, open: delOpen } = useAreYouSure({
    title: "Restore Lead?",
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
              You are restoring a deleted <b>Media</b>.
              <br />
              <br />
              After restoring the media you can see it on the list again.
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

const MediaColumn = (): GridColumns<IDataTable> => {
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
      headerName: "Name",
      headerAlign: "center",
      field: "firstName",
      align: "center",
      width: 250,
      minWidth: 200,
      flex: 1,
      renderCell: (data: any) => `${data.row.first_name} ${data.row.last_name}`,
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
      headerName: "Address Line",
      headerAlign: "center",
      field: "address_line1",
      minWidth: 400,
      flex: 1,
      align: "center",
      resizable: true,
    },
    // {
    //   headerName: "Address Line 2",
    //   headerAlign: "center",
    //   field: "address_line2",
    //   minWidth: 100,
    //   flex: 1,
    //   align: "center",
    // },
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
            color="primary"
            onClick={() => navigate(`/app/media/details/${data.row?.id}`)}
            // disabled={!checkAccess(defaultPermissions.MediaS.FULL)}
            className="text-sm"
          >
            <p>View</p>
          </IconButton>
          {data?.row?.deleted_at ? (
            <>
              <RestoreButton id={data?.row?.id} />
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

export default MediaColumn;
