import { useMutation } from "@tanstack/react-query";
import { login } from "../../../api/auth";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      const token = data?.data?.token;
      if (!token) {
        return;
      }
      localStorage.setItem("auth_token", token);
    },
  });
};
