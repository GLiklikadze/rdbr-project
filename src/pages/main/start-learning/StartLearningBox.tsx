import starIcon from "@/assets/star.png";
import type { Course } from "../../../types";
import { useNavigate } from "react-router-dom";

const StartLearningBox: React.FC<{ featuredCourses: Course }> = ({
  featuredCourses,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex h-[576px] w-[506px] flex-col rounded-xl bg-white p-5">
      <img
        src={featuredCourses?.image}
        alt="course-photo"
        className="h-[262px] w-[466px] rounded-xl"
      />
      <div className="my-4">
        <div className="flex w-full flex-row items-center justify-between text-[14px] font-medium text-[#666666]">
          <p>{featuredCourses?.instructor?.name}</p>
          <div className="flex flex-row items-center gap-1">
            <img
              src={starIcon}
              alt="star-icon"
              className="inline-block h-[17px] w-[17px]"
            />
            <div>{featuredCourses?.avgRating ?? "N/A"}</div>
          </div>
        </div>
        <h2 className="mt-[12px] text-2xl font-semibold text-[#141414]">
          {featuredCourses?.title}
        </h2>
      </div>
      <p className="pr-16 text-base">{featuredCourses?.description}</p>
      <div className="mt-6 flex flex-row justify-between">
        <div className="flex flex-row items-center gap-2">
          <div className="text-xs">Starting From</div>
          <div className="text-[32px] font-semibold text-[#141414]">
            ${featuredCourses?.basePrice}
          </div>
        </div>
        <button
          onClick={() => navigate(`/courses/${featuredCourses?.id}`)}
          className="rounded-lg border-2 bg-[#4F46E5] px-8 py-[14px] text-xl font-medium text-[#FFFFFF]"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default StartLearningBox;
