import { useMutation } from "@tanstack/react-query";
import { login } from "../../../api/auth";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.user));
    },
  });
};
