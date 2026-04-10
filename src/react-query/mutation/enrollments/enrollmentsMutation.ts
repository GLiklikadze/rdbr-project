import { useMutation } from "@tanstack/react-query";
import { enrolleCourse } from "../../../api/enrollements";

export const useEnrolleCourse = () => {
  return useMutation({
    mutationKey: ["enrolle-course"],
    mutationFn: enrolleCourse,
    onSuccess: () => {
      console.log("enrolled course succesfully");
    },
  });
};
