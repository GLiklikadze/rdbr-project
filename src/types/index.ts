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
