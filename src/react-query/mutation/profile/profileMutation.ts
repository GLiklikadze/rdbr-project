import { useMutation } from "@tanstack/react-query";
import { putProfile } from "../../../api/profile";
import { useAtom } from "jotai";
import { userProfileAtom } from "../../../state";

export const useUpdateProfile = () => {
  const [, setProfile] = useAtom(userProfileAtom);
  return useMutation({
    mutationKey: ["update-profile"],
    mutationFn: putProfile,
    onSuccess: (data) => {
      if (!data) {
        return;
      }
      setProfile(data?.data);
    },
  });
};
