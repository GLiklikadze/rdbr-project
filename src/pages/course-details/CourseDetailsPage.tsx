import starIcon from "@/assets/star.png";
import clockIcon from "@/assets/clock.svg";
import calendarIcon from "@/assets/calendar.svg";
import codeIcon from "@/assets/code.svg";
import { useParams } from "react-router-dom";
import { useGetSingleCourse } from "../../react-query/query/courses/coursesQuery";

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const { data: course } = useGetSingleCourse(courseId ?? "");
  console.log("Course Details:", course);
  return (
    <div className="my-16 px-[177px] text-[#525252]">
      <div>
        <div className="mb-[33px] text-[18px] font-medium">Home</div>
        <section className="flex max-w-[812px] flex-col">
          <h1 className="mb-6 text-[40px] font-medium text-[#141414]">
            {course?.title}
          </h1>
          <img
            src={course?.image}
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
                <div>{course?.durationWeeks}</div>
              </div>
              <div className="flex flex-row items-center gap-1">
                <img
                  src={clockIcon}
                  alt="clock-icon"
                  className="inline-block h-[18px] w-[18px]"
                />
                <div>{course?.basePrice}</div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-[28px]">
              <div className="flex flex-row items-center gap-1">
                <img
                  src={starIcon}
                  alt="star-icon"
                  className="inline-block h-[17px] w-[17px]"
                />
                <div>{course?.isRated || "N/A"}</div>
              </div>
              <div className="flex flex-row items-center gap-[10px]">
                <img
                  src={codeIcon}
                  alt="code-icon"
                  className="inline-block h-[17px] w-[17px]"
                />
                <div>{course?.category?.name}</div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex w-fit flex-row items-center gap-3 whitespace-nowrap rounded-xl bg-[#FFFFFF] p-2">
            <img
              src={course?.instructor?.avatar}
              alt="insctructor-image"
              className="mr-1 h-[30px] w-[30px] rounded-[4px] object-cover"
            />
            <div className="text-base font-medium">
              {course?.instructor?.name ?? "N/A"}
            </div>
          </div>
          <h2 className="mt-[18px]">Course Description</h2>
          <p className="mt-6">{course?.description}</p>
        </section>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
