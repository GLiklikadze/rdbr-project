import { useQuery } from "@tanstack/react-query";
import { getEnrolledCourses } from "../../../api/enrollements";
export const useGetEnrolledList = () => {
  return useQuery({
    queryKey: ["get-enrolled-list"],
    queryFn: () => getEnrolledCourses(),
  });
};
