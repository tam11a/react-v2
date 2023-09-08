// Instance
import instance, { updateInstanceAuthorization } from "@/services";

// Third Party
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { ILogin, IUpdateUser } from "./types";
import { IUserId } from "@/types";

//Login Function
const login = (data: ILogin) => {
  return instance.post("/auth/signin", { ...data });
};

export const useLogin = () => {
  return useMutation(login);
};

//Logout function with instance
const logout = () => {
  return instance.delete("/auth/signout");
};
export const useLogout = () => {
  return useMutation(logout);
};

// Validation function with instance
const getValidateUser = () => {
  updateInstanceAuthorization();
  return instance.get("/auth/validate");
};

export const useGetValidation = (token: string | null) => {
  return useQuery(["validate", token], getValidateUser, {
    enabled: !!token,
    retry: 1,
    onError: async (error: { request: { status: number } }) => {
      return error.request.status;
    },
    // networkMode: "offlineFirst",
  });
};

// User information update
const updateUserInfo = ({
  userId,
  data,
}: {
  userId: IUserId;
  data: IUpdateUser | any;
}) => {
  return instance.patch(`/auth/update`, {
    ...data,
  });
};

export const useUpdateUserInfo = () => {
  const query = useQueryClient();
  return useMutation([], updateUserInfo, {
    onSuccess: () => {
      query.invalidateQueries(["validate"]);
    },
  });
};

// User password reset
const updatePassword = (data: {
  current_password?: string;
  new_password?: string;
}) => {
  return instance.patch(`/auth/reset-password`, {
    ...data,
  });
};

export const useUpdatePassword = () => useMutation(updatePassword);
