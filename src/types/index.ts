import type { AxiosError } from "axios";
import type { PropsWithChildren } from "react";
export interface CoursesResponse {
  data: Course[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: string;
  durationWeeks: number;
  isFeatured: boolean;
  avgRating: number | null;
  reviewCount: number;
  isRated: number | boolean;
  category: Category;
  topic: Topic;
  instructor: Instructor;
  hours: number;
}
export interface Review {
  userId: number;
  rating: number;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Topic {
  id: number;
  name: string;
}

export interface Instructor {
  id: number;
  name: string;
  avatar: string;
}

export interface CourseDetails {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: string;
  durationWeeks: number;
  hours: number;
  isFeatured: boolean;
  reviews: Review[];
  isRated: boolean;
  category: Category;
  topic: Topic;
  instructor: Instructor;
  enrollment: null | EnrollmentCourse;
}
export interface EnrollmentCourse {
  id: number;
  progress: number;
  completedAt: string | null;
  schedule: ScheduleDetails;
}

export interface ScheduleDetails {
  weeklySchedule: LabelObject;
  timeSlot: LabelObject;
  sessionType: SessionType;
  location: string;
  totalPrice: string; // Keep as string since JSON has quotes
}

export interface LabelObject {
  id: number;
  label: string;
}

export interface SessionType {
  id: number;
  name: string;
  priceModifier: string; // Keep as string to match "30.00"
}
export interface Category {
  id: number;
  name: string;
}

export interface Topic {
  id: number;
  name: string;
}

export interface Instructor {
  id: number;
  name: string;
  avatar: string;
}

export interface SessionTypeData {
  id: number;
  courseScheduleId: number;
  name: string;
  priceModifier: number;
  availableSeats: number;
  location: string;
}

export interface ScheduleDay {
  id: number;
  label: string;
  days: (
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday"
  )[];
}
export interface SessionTimeSlot {
  id: number;
  label: string;
  startTime: string;
  endTime: string;
}
export type UserProfileType = {
  age: number | null;
  avatar: string;
  email: string;
  fullName: string;
  id: number;
  mobileNumber: string | null;
  profileComplete: boolean;
  username: string;
};

export interface ProfileModalProps extends PropsWithChildren {
  userInfo: {
    fullName: string;
    id: number;
    username: string;
    age: number | string;
    mobileNumber: string;
    avatar: null | string;
    profileComplete: boolean;
    email: string;
  };
  notCompleteProfile: boolean;
}
export interface formData {
  full_name: string;
  age: string;
  mobile_number: string;
  avatar: File | null;
}

export interface EnrollmentConflictModalProps {
  error: AxiosError<unknown> | null;
  isError: boolean;
  courseId: string | number;
  courseScheduleId: string | number;
}
