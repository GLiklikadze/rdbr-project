import { httpClient } from "..";
import type { Course, CoursesResponse } from "../../types";

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

export const getSingleCourse = async (courseId: string): Promise<Course> => {
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
