import { useGetFeaturedCourses } from "../../../react-query/query/courses/coursesQuery";
import StartLearningBox from "./StartLearningBox";
import type { Course } from "../../../types";

const StartLearningSection = () => {
  const { data: featuredCourses } = useGetFeaturedCourses();
  console.log("Featured Courses:", featuredCourses);
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-[40px] font-semibold text-[#0A0A0A]">
          Start Learning Today
        </h2>

        <p className="mt-[10px] text-[18px] font-normal text-[#3D3D3D]">
          Choose from our most popular courses and begin your journey
        </p>
      </div>
      <div className="flex flex-row gap-6">
        {featuredCourses?.data?.map((course: Course) => (
          <StartLearningBox key={course?.id} featuredCourses={course} />
        ))}
      </div>
    </div>
  );
};

export default StartLearningSection;
