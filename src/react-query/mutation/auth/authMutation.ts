import { useMutation } from "@tanstack/react-query";
import { login } from "../../../api/auth";
import { useAtom } from "jotai";
import { tokenAtom, userProfileAtom } from "../../../state";

export const useLogin = () => {
  const [, setToken] = useAtom(tokenAtom);
  const [, setProfile] = useAtom(userProfileAtom);
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      const token = data?.data?.token;
      if (!token) {
        return;
      }
      setToken(token);
      setProfile(data?.data?.user);
    },
  });
};
