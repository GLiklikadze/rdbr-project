import { httpClient } from "..";
import type {
  Course,
  CourseDetails,
  CourseFilters,
  CoursesResponse,
} from "../../types";

export const getCourses = async (
  filters: CourseFilters,
): Promise<CoursesResponse> => {
  try {
    const { data, status, statusText } = await httpClient.get("/courses", {
      params: {
        "categories[]": filters?.categories,
        "topics[]": filters?.topics,
        "instructors[]": filters?.instructors,
        sort: filters?.sort,
        page: filters.page,
      },
    });

    if (status !== 200) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }

    return data;
  } catch (err) {
    console.error("Error fetching courses:", err);
    throw err;
  }
};

export const getFeaturedCourses = async (): Promise<CoursesResponse> => {
  try {
    const { data, status, statusText } =
      await httpClient.get("/courses/featured");
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Error fetching featured courses:", err);
    throw err;
  }
};

export const getSingleCourse = async (
  courseId: string,
): Promise<CourseDetails> => {
  try {
    const { data, status, statusText } = await httpClient.get(
      `/courses/${courseId}`,
    );
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data?.data;
  } catch (err) {
    console.error("Error fetching single course:", err);
    throw err;
  }
};

export const getCoursesList = async (): Promise<Course[]> => {
  try {
    const { data, status, statusText } = await httpClient.get("/courses");
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data?.data;
  } catch (err) {
    console.error("Error fetching courses:", err);
    throw err;
  }
};
