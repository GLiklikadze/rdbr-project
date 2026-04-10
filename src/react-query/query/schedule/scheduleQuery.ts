import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getHoursSchedule,
  getLocation,
  getWeeklySchedule,
} from "../../../api/schedule";

export const useGetWeeklySchedule = (courseId: string) => {
  return useQuery({
    queryKey: ["get-weekly-schedule", courseId],
    retry: false,
    queryFn: () => getWeeklySchedule(courseId),
  });
};

export const useGetCourseHours = () => {
  return useMutation({
    mutationKey: ["get-course-hours"],
    mutationFn: ({
      courseId,
      weekly_schedule_id,
    }: {
      courseId: string;
      weekly_schedule_id: string;
    }) => getHoursSchedule(courseId, weekly_schedule_id),
  });
};
export const useGetSessionType = () => {
  return useMutation({
    mutationKey: ["get-course-locations"],
    mutationFn: ({
      courseId,
      weekly_schedule_id,
      time_slot_id,
    }: {
      courseId: string;
      weekly_schedule_id: string;
      time_slot_id: string;
    }) => getLocation(courseId, weekly_schedule_id, time_slot_id),
  });
};
