import starIcon from "@/assets/star.png";
import type { Enrollment } from "../../../api/enrollements";
import { useNavigate } from "react-router-dom";

type ContinueLearningBoxProps = {
  enrolled: Enrollment;
};

const ContinueLearningBoxAuth = ({ enrolled }: ContinueLearningBoxProps) => {
  const navigate = useNavigate();
  return (
    <div
      key={enrolled?.id}
      className="h-[219px] w-[506px] rounded-xl bg-white p-5"
    >
      <div className="flex flex-row gap-4">
        <img
          src={enrolled?.course?.image}
          alt="course-photo"
          className="h-[123px] w-[140px] rounded-xl"
        />
        <div className="w-full">
          <div className="flex w-full flex-row items-center justify-between text-[14px] font-medium text-[#666666]">
            <p> {enrolled?.course?.instructor.name}</p>
            <div className="flex flex-row items-center gap-1">
              <img
                src={starIcon}
                alt="star-icon"
                className="inline-block h-[17px] w-[17px] -translate-y-[2px]"
              />

              <div>4.9</div>
            </div>
          </div>
          <h2 className="font-semibold text-[#141414]">
            {enrolled?.course?.title}
          </h2>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="mt-[17px] flex flex-col gap-1">
          <div className="text-xs text-[#141414]">
            {" "}
            {enrolled?.progress}% Completed
          </div>
          <div className="h-[15px] w-[336px] rounded-[30px] bg-[#DDDBFA]">
            <div
              className={`h-[15px] rounded-[30px] bg-[#4F46E5]`}
              style={{ width: `${enrolled?.progress}%` }}
            ></div>
          </div>
        </div>
        <button
          onClick={() => navigate(`/courses/${enrolled?.course.id}`)}
          className="rounded-lg border-2 border-[#958FEF] px-5 text-base text-[#958FEF]"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ContinueLearningBoxAuth;
