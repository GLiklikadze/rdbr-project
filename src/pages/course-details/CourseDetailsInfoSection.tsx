import type { CourseDetails } from "../../types";
import starIcon from "@/assets/star.png";
import clockIcon from "@/assets/clock.svg";
import calendarIcon from "@/assets/calendar.svg";
import codeIcon from "@/assets/code.svg";

type CourseDetailsInfoSectionProps = {
  courseDetailsData: CourseDetails;
};

const CourseDetailsInfoSection: React.FC<CourseDetailsInfoSectionProps> = ({
  courseDetailsData,
}) => {
  const avgRanking = () => {
    if (courseDetailsData?.reviews && courseDetailsData.reviews.length > 0) {
      return (
        courseDetailsData?.reviews.reduce(
          (acc: number, review) => acc + review.rating,
          0,
        ) / courseDetailsData.reviews.length
      ).toFixed(1);
    }
  };
  return (
    <section className="flex max-w-[812px] flex-col">
      <div className="mb-[33px] text-[18px] font-medium">
        Home &#10095; Browse &#10095;{" "}
        <span className="text-[#4F46E5]">
          {" "}
          {courseDetailsData?.category?.name}
        </span>
      </div>
      <h1 className="mb-6 text-[40px] font-medium text-[#141414]">
        {courseDetailsData?.title}
      </h1>
      <img
        src={courseDetailsData?.image}
        alt="Course"
        className="h-[474px] w-[903px] rounded-[10px]"
      />
      <div className="mt-[22px] flex flex-row items-center justify-between text-sm">
        <div className="flex flex-row gap-3">
          <div className="flex flex-row items-center gap-1">
            <img
              src={calendarIcon}
              alt="clock-icon"
              className="inline-block h-[18px] w-[18px]"
            />
            <div>{courseDetailsData?.durationWeeks} Weeks</div>
          </div>
          <div className="flex flex-row items-center gap-1">
            <img
              src={clockIcon}
              alt="clock-icon"
              className="inline-block h-[18px] w-[18px]"
            />
            <div>{courseDetailsData?.hours} Hours</div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-[28px]">
          <div className="flex flex-row items-center gap-1">
            <img
              src={starIcon}
              alt="star-icon"
              className="inline-block h-[17px] w-[17px]"
            />
            <div>{avgRanking() || "N/A"}</div>
          </div>
          <div className="flex flex-row items-center gap-[10px] rounded-xl px-3 py-2 hover:bg-[#DDDBFA]">
            <img
              src={codeIcon}
              alt="code-icon"
              className="inline-block h-[17px] w-[17px]"
            />
            <div>{courseDetailsData?.category?.name}</div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex w-fit flex-row items-center gap-3 whitespace-nowrap rounded-xl bg-[#FFFFFF] p-2">
        <img
          src={courseDetailsData?.instructor?.avatar}
          alt="insctructor-image"
          className="mr-1 h-[30px] w-[30px] rounded-[4px] object-cover"
        />
        <div className="text-base font-medium">
          {courseDetailsData?.instructor?.name ?? "N/A"}
        </div>
      </div>
      <h2 className="mt-[18px]">Course Description</h2>
      <p className="mt-6">{courseDetailsData?.description}</p>
    </section>
  );
};

export default CourseDetailsInfoSection;
