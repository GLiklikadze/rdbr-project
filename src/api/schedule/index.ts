import { httpClient } from "..";
import type {
  ScheduleDay,
  SessionTimeSlot,
  SessionTypeData,
} from "../../types";

export const getWeeklySchedule = async (
  courseId: string,
): Promise<ScheduleDay[]> => {
  try {
    const { data, status, statusText } = await httpClient.get(
      `courses/${courseId}/weekly-schedules`,
    );
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data?.data;
  } catch (err) {
    console.error("Error fetching course schedule:", err);
    throw err;
  }
};

export const getHoursSchedule = async (
  courseId: string,
  weekly_schedule_id: string,
): Promise<SessionTimeSlot[]> => {
  try {
    const { data, status, statusText } = await httpClient.get(
      `courses/${courseId}/time-slots`,
      {
        params: { weekly_schedule_id },
      },
    );
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data?.data;
  } catch (err) {
    console.error("Error fetching course schedule:", err);
    throw err;
  }
};
export const getLocation = async (
  courseId: string,
  weekly_schedule_id: string,
  time_slot_id: string,
): Promise<SessionTypeData[]> => {
  try {
    const { data, status, statusText } = await httpClient.get(
      `courses/${courseId}/session-types`,
      {
        params: { weekly_schedule_id, time_slot_id },
      },
    );
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data?.data;
  } catch (err) {
    console.error("Error fetching course slots:", err);
    throw err;
  }
};
