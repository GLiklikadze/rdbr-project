import { httpClient } from "..";
import type { Category, Instructor, Topic } from "../../types";

type enrolleCourseProps = {
  courseId: number;
  courseScheduleId: number;
  force: boolean;
};

type completeEnrolledCourseProps = {
  courseEnrollementId: number;
};
type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface WeeklySchedule {
  id: number;
  label: string;
  days: DayOfWeek[];
}
export interface TimeSlot {
  id: number;
  label: string;
  startTime: string;
  endTime: string;
}

export interface SessionType {
  id: number;
  courseScheduleId: number;
  name: "online" | "offline" | string;
  priceModifier: number;
  availableSeats: number;
  location: string;
}
export interface Enrollment {
  id: number;
  quantity: number;
  totalPrice: number;
  progress: number;
  completedAt: string | null;
  course: Course;
  schedule: {
    weeklySchedule: WeeklySchedule;
    timeSlot: TimeSlot;
    sessionType: SessionType;
    location: string;
  };
}

export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: number;
  durationWeeks: number;
  isFeatured: boolean;
  avgRating: number;
  reviewCount: number;
  category: Category;
  topic: Topic;
  instructor: Instructor;
}
export const getEnrolledCourses = async (): Promise<Enrollment[]> => {
  try {
    const { data, status, statusText } = await httpClient.get("/enrollments");
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data?.data;
  } catch (err) {
    console.error("Error fetching enrolled:", err);
    throw err;
  }
};

export const enrolleCourse = async ({
  courseId,
  courseScheduleId,
  force,
}: enrolleCourseProps) => {
  try {
    const { data, status, statusText } = await httpClient.post(`enrollments`, {
      courseId,
      courseScheduleId,
      force,
    });

    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Can`t enrolle", err);
    throw err;
  }
};
export const completeEnrolledCourse = async ({
  courseEnrollementId,
}: completeEnrolledCourseProps) => {
  try {
    const { data, status, statusText } = await httpClient.patch(
      `enrollments/${courseEnrollementId}/complete`,
    );

    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Can`t complete", err);
    throw err;
  }
};
export const deleteEnrolledCourse = async ({
  courseEnrollementId,
}: completeEnrolledCourseProps) => {
  try {
    const { data, status, statusText } = await httpClient.delete(
      `enrollments/${courseEnrollementId}`,
    );

    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Can`t delete", err);
    throw err;
  }
};
