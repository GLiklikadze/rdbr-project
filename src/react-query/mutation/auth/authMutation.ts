import { useMutation } from "@tanstack/react-query";
import { login, register } from "../../../api/auth";
import { useAtom } from "jotai";
import {
  isRegisterModalOpenAtom,
  tokenAtom,
  userProfileAtom,
} from "../../../state";

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
export const useRegister = () => {
  const [, setToken] = useAtom(tokenAtom);
  const [, setProfile] = useAtom(userProfileAtom);
  const [, setRegisterModal] = useAtom(isRegisterModalOpenAtom);
  return useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: (data) => {
      const token = data?.data?.token;
      if (!token) {
        return;
      }
      setToken(token);
      setProfile(data?.data?.user);
      setRegisterModal(false);
    },
  });
};
