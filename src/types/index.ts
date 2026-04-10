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
  enrollment: null;
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
