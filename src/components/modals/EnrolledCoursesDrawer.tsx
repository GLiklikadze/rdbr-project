import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "../ui/drawer";
import pinIcon from "@/assets/pin.svg";
import clockIcon from "@/assets/clock.svg";
import sessionTypeIcon from "@/assets/session_type.svg";
import calendar2Icon from "@/assets/calendar_2.svg";
import starIcon from "@/assets/star.png";
import boxIcon from "@/assets/box.svg";
import { useGetEnrolledList } from "../../react-query/query/enrollments/enrollementsQuery";
import { useNavigate } from "react-router-dom";
import { type PropsWithChildren } from "react";
import { useAtom } from "jotai";
import { EnrolledDrawerOpen } from "../../state";

export const EnrolledCoursesDrawer: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { data: enrolledList } = useGetEnrolledList();
  const [drawerOpen, setDrawerOpen] = useAtom(EnrolledDrawerOpen);
  const navigate = useNavigate();

  return (
    <Drawer
      modal={true}
      direction="right"
      open={drawerOpen}
      onOpenChange={setDrawerOpen}
    >
      {children}
      <DrawerContent className="min-w-[794px] bg-[#F5F5F5]">
        <DrawerTitle className="flex flex-row items-end justify-between p-0 px-[57px] text-[#0A0A0A]">
          <div className="pt-[42px] text-4xl font-semibold">
            Enrolled Courses
          </div>
          <div className="text-base font-medium">
            Total Enrollments {enrolledList?.length}
          </div>
        </DrawerTitle>
        <DrawerDescription></DrawerDescription>
        <div className="no-scrollbar flex h-fit flex-col gap-3 overflow-y-auto overflow-x-hidden pl-[73px] pr-[97px] pt-[37px]">
          {enrolledList && enrolledList?.length > 0 ? (
            enrolledList?.map((enrolled) => (
              <div
                key={enrolled?.id}
                className="h-[295px] w-[623px] rounded-xl bg-white p-5"
              >
                <div className="flex flex-row gap-4">
                  <img
                    src={enrolled?.course?.image}
                    alt="course-photo"
                    className="h-[191px] w-[269px] rounded-xl"
                  />
                  <div>
                    <div className="flex w-[297px] flex-row items-center justify-between text-[14px] text-[#666666]">
                      <div className="flex flex-row gap-1">
                        <div className="text-[#8A8A8A]">Instructor</div>
                        <p className="font-medium">
                          {enrolled?.course?.instructor?.name}
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        <div>
                          <img
                            src={starIcon}
                            alt="star-icon"
                            className="inline-block h-[17px] w-[17px] -translate-y-[2px]"
                          />
                        </div>
                        <div>{enrolled?.course?.avgRating}</div>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold text-[#141414]">
                      {enrolled?.course?.title}
                    </h2>
                    <div className="mt-[12px] flex flex-col gap-2">
                      <div className="flex flex-row items-center gap-3">
                        <img
                          src={calendar2Icon}
                          alt="calendar-icon"
                          className="inline-block h-[16px] w-[16px]"
                        />
                        {enrolled?.schedule.weeklySchedule?.label}
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <img
                          src={clockIcon}
                          alt="clock-icon"
                          className="inline-block h-[16px] w-[16px]"
                        />
                        {enrolled?.schedule?.timeSlot.label}
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <img
                          src={sessionTypeIcon}
                          alt="session-type-icon"
                          className="inline-block h-[16px] w-[16px]"
                        />
                        {enrolled?.schedule?.sessionType.name}
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <img
                          src={pinIcon}
                          alt="pin-icon"
                          className="inline-block h-[16px] w-[16px]"
                        />
                        {enrolled?.schedule?.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-end justify-between">
                  <div className="mt-[17px] flex flex-col gap-2">
                    <div className="text-xs text-[#141414]">
                      {enrolled?.progress}% Completed
                    </div>
                    <div className="h-[15px] w-[442px] rounded-[30px] bg-[#DDDBFA]">
                      <div
                        className={`h-[15px] rounded-[30px] bg-[#4F46E5]`}
                        style={{ width: `${enrolled?.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigate(`/courses/${enrolled?.course.id}`);
                      setDrawerOpen(false);
                    }}
                    className="h-[48px] w-[117px] rounded-lg border-2 border-[#958FEF] px-5 text-base text-[#958FEF]"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center px-[99px] py-[273px] text-[#130E67]">
              <img src={boxIcon} alt="box-icon" className="inline-block" />
              <h2 className="text-2xl font-semibold">
                No Enrolled Courses Yet
              </h2>
              <p className="mt-2 text-sm font-medium">
                Your learning journey starts here! <br /> Browse courses to get
                started.
              </p>
              <button
                onClick={() => navigate(`/courses`)}
                className="mt-[13px] h-[58px] w-[175px] rounded-lg border-2 bg-[#4F46E5] px-[25px] py-[17px] text-base font-medium text-[#FFFFFF]"
              >
                Details
              </button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
