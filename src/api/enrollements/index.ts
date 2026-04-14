import { httpClient } from "..";

type enrolleCourseProps = {
  courseId: number;
  courseScheduleId: number;
  force: boolean;
};

type completeEnrolledCourseProps = {
  courseEnrollementId: number;
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
