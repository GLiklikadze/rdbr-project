import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  completeEnrolledCourse,
  enrolleCourse,
} from "../../../api/enrollements";
import type { AxiosError } from "axios";
import { useAtom } from "jotai";
import {
  completeCourseModalOpenAtom,
  isConflictModalOpenAtom,
} from "../../../state";

export const useEnrolleCourse = () => {
  const [, setIsConflictModalOpen] = useAtom(isConflictModalOpenAtom);
  return useMutation({
    mutationKey: ["enrolle-course"],
    mutationFn: enrolleCourse,
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        setIsConflictModalOpen(true);
      }
    },
  });
};
export const useCompleteEnrolledCourse = () => {
  const [, setIsCompleteModalOpen] = useAtom(completeCourseModalOpenAtom);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["complete-enrolled-course"],
    mutationFn: completeEnrolledCourse,
    onSuccess: () => {
      setIsCompleteModalOpen(true);
      queryClient.invalidateQueries({ queryKey: ["get-single-course"] });
    },
  });
};
