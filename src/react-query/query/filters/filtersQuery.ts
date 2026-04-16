import { useQuery } from "@tanstack/react-query";
import { getCategories, getInstructors, getTopics } from "../../../api/filters";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["get-categories"],
    retry: false,
    queryFn: () => getCategories(),
  });
};
export const useGetTopic = () => {
  return useQuery({
    queryKey: ["get-topics"],
    retry: false,
    queryFn: () => getTopics(),
  });
};

export const useGetInstructors = () => {
  return useQuery({
    queryKey: ["get-instructors"],
    retry: false,
    queryFn: () => getInstructors(),
  });
};
