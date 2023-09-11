import { GridColumns } from "@mui/x-data-grid";
import { IDataTable } from "@/types";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import useAreYouSure from "@/hooks/useAreYouSure";
import { useDeleteProperty } from "@/queries/properties";

const DeleteButton: React.FC<{ id: number | string }> = ({ id }) => {
  const { mutateAsync: deleteProperty } = useDeleteProperty();

  const onDelete = async (id: any) => {
    message.open({
      type: "loading",
      content: "Deleting Property..",
      duration: 0,
    });
    const res = await handleResponse(() => deleteProperty({ id }));

    message.destroy();
    if (res.status) {
      message.success("Property deleted successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const { contextHolder: delContextHolder, open: delOpen } = useAreYouSure({
    title: "Delete Property?",
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
              You are deleting a property.
              <br />
              <br />
              Deleting a property means the property will move to trash folder.
              After deleting, this work can't be undone. You'll have to restore
              the property to use again
            </>
          );
        }}
        // disabled={!checkAccess(defaultPermissions.PROPERTYS.FULL)}
      >
        <Icon icon="bxs:trash" />
      </IconButton>
    </>
  );
};

const PropertiesColumn = (): GridColumns<IDataTable> => {
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
      headerName: "Area",
      headerAlign: "center",
      field: "area",
      align: "center",
      width: 250,
      minWidth: 200,
      flex: 1,
      renderCell: (data: any) => `${data?.row?.["address.area"]}`,
    },
    {
      headerName: "Block/Sec",
      headerAlign: "center",
      field: "block",
      align: "center",
      width: 250,
      minWidth: 200,
      flex: 1,
      renderCell: (data: any) => `${data?.row?.["address.block"]}`,
    },

    {
      headerName: "Road",
      headerAlign: "center",
      field: "road",
      align: "center",
      flex: 1,
      width: 160,
      minWidth: 150,
      renderCell: (data: any) => `${data?.row?.["address.plot"]}`,
    },
    {
      headerName: "Size",
      headerAlign: "center",
      field: "size",
      width: 250,
      minWidth: 200,
      flex: 1,
      align: "center",
      renderCell: (data: any) => `${data?.row?.size} ${data?.row?.size_unit}`,
    },
    {
      headerName: "Price",
      headerAlign: "center",
      field: "price",
      minWidth: 100,
      flex: 1,
      align: "center",
    },
    {
      headerName: "Media",
      headerAlign: "center",
      field: "media_id",
      minWidth: 100,
      flex: 1,
      align: "center",
      renderCell: (data: any) => data?.row?.media?.name,
    },
    {
      headerName: "Status",
      headerAlign: "center",
      field: "status",
      minWidth: 100,
      flex: 1,
      align: "center",
      renderCell: (data: any) => {
        data?.row?.status ? data?.row?.status : "-";
      },
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
            onClick={() => navigate(`/app/properties/details/${data.row?.id}`)}
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

export default PropertiesColumn;
