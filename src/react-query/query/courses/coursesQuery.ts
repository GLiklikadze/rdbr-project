import { useQuery } from "@tanstack/react-query";
import {
  getCourses,
  getFeaturedCourses,
  getSingleCourse,
} from "../../../api/courses";
import type { CourseFilters } from "../../../types";

export const useGetFeaturedCourses = () => {
  return useQuery({
    queryKey: ["get-featured-courses"],
    retry: false,
    queryFn: getFeaturedCourses,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
export const useGetCoursesList = (courseFilters: CourseFilters) => {
  return useQuery({
    queryKey: ["get-courses-list", courseFilters],
    retry: false,
    queryFn: () => getCourses(courseFilters),
    // staleTime: 5 * 60 * 1000,
    // gcTime: 5 * 60 * 1000,
  });
};

export const useGetSingleCourse = (courseId: string) => {
  return useQuery({
    queryKey: ["get-single-course", courseId],
    retry: false,
    queryFn: () => getSingleCourse(courseId),
  });
};
