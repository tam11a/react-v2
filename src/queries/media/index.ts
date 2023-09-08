import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateMedia, IUpdateMedia } from "./types";

const getMedia = (params: any) => {
  return instance.get(`/media`, {
    params,
  });
};

export const useGetMedia = (params: any) => {
  return useQuery(["get-all-media", params], () => getMedia(params));
};

const createMedia = (data: ICreateMedia) => {
  return instance.post("/media", data);
};

export const useCreateMedia = () => {
  const queryClient = useQueryClient();
  return useMutation(createMedia, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-media"]),
  });
};

const getMediaById = (id?: string | number) => {
  return instance.get(`/media/${id}`);
};

export const useGetMediaById = (id?: string | number) => {
  return useQuery(["get-all-media-by-id", id], () => getMediaById(id), {
    enabled: !!id,
  });
};

const updateMediaById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateMedia | any;
}) => {
  return instance.patch(`/media/${id}`, {
    ...data,
  });
};

export const useUpdateMediaById = () => {
  const query = useQueryClient();
  return useMutation(updateMediaById, {
    onSuccess: () => {
      query.invalidateQueries(["get-all-media"]);
      query.invalidateQueries(["get-media-by-id"]);
    },
  });
};

const deleteMedia = ({ id, params }: { id: number; params?: any }) => {
  return instance.delete(`/media/${id}`, {
    params,
  });
};

export const useDeleteMedia = () => {
  const query = useQueryClient();
  return useMutation(deleteMedia, {
    onSuccess: () => {
      query.invalidateQueries(["get-all-media"]);
      query.invalidateQueries(["get-media-by-id"]);
    },
  });
};
