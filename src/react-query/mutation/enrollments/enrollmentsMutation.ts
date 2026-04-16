import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  completeEnrolledCourse,
  deleteEnrolledCourse,
  enrolleCourse,
} from "../../../api/enrollements";
import type { AxiosError } from "axios";
import { useAtom } from "jotai";
import {
  completeCourseModalOpenAtom,
  isConflictModalOpenAtom,
} from "../../../state";

export const useEnrolleCourse = () => {
  const queryClient = useQueryClient();
  const [, setIsConflictModalOpen] = useAtom(isConflictModalOpenAtom);
  return useMutation({
    mutationKey: ["enrolle-course"],
    mutationFn: enrolleCourse,
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        setIsConflictModalOpen(true);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-single-course"],
        exact: false,
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["get-enrolled-list"],
        refetchType: "all",
      });
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
      queryClient.invalidateQueries({
        queryKey: ["get-single-course"],
        refetchType: "all",
      });
    },
  });
};
export const useDeleteEnrolledCourse = () => {
  const [, setIsCompleteModalOpen] = useAtom(completeCourseModalOpenAtom);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-enrolled-course"],
    mutationFn: deleteEnrolledCourse,
    onSuccess: () => {
      setIsCompleteModalOpen(true);
      // queryClient.invalidateQueries({
      //   queryKey: ["get-single-course"],
      //   exact: false,
      //   refetchType: "all",
      // });
      queryClient.invalidateQueries({
        queryKey: ["get-enrolled-list"],
        exact: false,
        refetchType: "all",
      });
    },
  });
};
