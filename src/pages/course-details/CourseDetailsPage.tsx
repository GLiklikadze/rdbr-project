import pinIcon from "@/assets/pin.svg";
import oneIcon from "@/assets/one.svg";
import twoIcon from "@/assets/two.svg";
import threeIcon from "@/assets/three.svg";
import triangleIcon from "@/assets/triangle.svg";
import { useParams } from "react-router-dom";
import { useGetSingleCourse } from "../../react-query/query/courses/coursesQuery";
import {
  useGetCourseHours,
  useGetSessionType,
  useGetWeeklySchedule,
} from "../../react-query/query/schedule/scheduleQuery";
import { useState } from "react";
import CourseDetailsInfoSection from "./CourseDetailsInfoSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { useEnrolleCourse } from "../../react-query/mutation/enrollments/enrollmentsMutation";
import { days, hours, sessionTypes } from "./components/constantData";
import type { daysType, hoursType, sessionType } from "./components/types";

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const { data: courseDetailsData } = useGetSingleCourse(courseId ?? "");
  const { data: weeklySchedule } = useGetWeeklySchedule(courseId ?? "");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedHourId, setSelectedHourId] = useState<number | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null,
  );
  const {
    data: hoursScheduleData,
    mutate: hoursMutate,
    isPending,
  } = useGetCourseHours();
  const { data: sessionTypeData, mutate: mutateSessionType } =
    useGetSessionType();

  const { mutate: enrolleCourseMutate } = useEnrolleCourse();

  const handleCourseEnroll = () => {
    const courseScheduleId =
      sessionTypeData?.find((item) => item.id === selectedSessionId)
        ?.courseScheduleId ?? 0;
    enrolleCourseMutate({
      courseId: Number(courseId ?? 0),
      courseScheduleId: courseScheduleId,
      force: false,
    });
  };

  console.log(selectedId, selectedHourId, selectedSessionId);
  console.log("sessiontypes", sessionTypeData);

  const toggleId = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
    setSelectedHourId(null);
    setSelectedSessionId(null);
  };
  const toggleHourId = (id: number) => {
    setSelectedHourId((prev) => (prev === id ? null : id));
    mutateSessionType({
      courseId: courseId ?? "",
      weekly_schedule_id: selectedId?.toString() ?? "",
      time_slot_id: id.toString(),
    });
  };
  const toggleSessionId = (id: number) => {
    setSelectedSessionId((prev) => (prev === id ? null : id));
  };
  console.log("detailed course", courseDetailsData);

  console.log("weeklysch", weeklySchedule);
  const handleDayClick = (dayId: number) => {
    hoursMutate({
      courseId: courseId ?? "",
      weekly_schedule_id: dayId.toString(),
    });
    toggleId(dayId);
  };

  const sessionAvailableMessage = (quantity: number) => {
    let message;
    if (quantity > 5) {
      message = <div className="font-medium">{quantity} Seats Available</div>;
    } else if (quantity < 5 && quantity > 0) {
      message = (
        <div className="flex flex-row gap-[1px]">
          <img src={triangleIcon} />
          <div className="font-medium text-[#F4A316]">
            Only {quantity} Seats Remaining`
          </div>
        </div>
      );
    } else if (quantity <= 0 || quantity == null) {
      message = <div className="font-medium">No Seats Available</div>;
    }
    return message;
  };
  const sessionPrice = sessionTypeData
    ? Number(
        sessionTypeData?.find((item) => item.id === selectedSessionId)
          ?.priceModifier || 0,
      )
    : 0;
  const base = Number(courseDetailsData?.basePrice) || 0;
  const extra = Number(sessionPrice) || 0;

  const totalPrice = courseDetailsData ? Math.trunc(base + extra) : "";

  return (
    <div className="my-16 px-[177px] text-[#525252]">
      <div className="flex flex-row gap-[133px]">
        {courseDetailsData && (
          <CourseDetailsInfoSection courseDetailsData={courseDetailsData} />
        )}
        <section className="mt-[130px] flex flex-col gap-2">
          <Accordion type="single" collapsible defaultValue="week">
            <AccordionItem value="week">
              <AccordionTrigger>
                <div className="flex flex-row items-center gap-1">
                  <img src={oneIcon} alt="one-icon" />
                  <h3 className="text-base font-semibold text-[#130E67]">
                    Weekly Schedule
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mt-[18px] flex flex-row gap-3">
                  {days.map((day) => {
                    const isActive = weeklySchedule?.some(
                      (d: daysType) => d.id === day.id,
                    );
                    const isSelected = selectedId === day?.id;
                    return (
                      <button
                        key={day.id}
                        onClick={() => handleDayClick(day.id)}
                        disabled={!isActive || isPending}
                        className={`flex h-[90px] w-[124px] items-center justify-center rounded-2xl border-[1px] font-semibold ${
                          isActive
                            ? `${isSelected ? "border-[#958FEF] bg-[#DDD8FA] text-[#4F46E5]" : "bg-[#FFFFFF] text-[#292929]"}`
                            : "text-[#D1D1D1]"
                        } `}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            type="single"
            collapsible
            defaultValue="hour"
            value={selectedId ? "hour" : ""}
          >
            <AccordionItem value="hour">
              <AccordionTrigger>
                <div className="flex flex-row items-center gap-1">
                  <img src={twoIcon} alt="two-icon" />
                  <h3 className="text-base font-semibold text-[#130E67]">
                    Time Slot
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mt-[18px] flex flex-row gap-3">
                  {hoursScheduleData &&
                    hours?.map((time: hoursType) => {
                      const isActive = hoursScheduleData?.some(
                        (h) => h.id === time.id,
                      );
                      const isSelected = selectedHourId === time?.id;
                      const baseClasses =
                        "flex h-[61px] w-[171px] flex-row items-center justify-center gap-3 rounded-xl border-[1px] transition-colors";

                      const stateClasses = !isActive
                        ? "border-[#D1D1D1] text-[#D1D1D1] cursor-not-allowed"
                        : isSelected
                          ? "border-[#958FEF] bg-[#DDD8FA] text-[#4F46E5]"
                          : "border-[#D1D1D1] bg-white text-[#292929]";
                      return (
                        <button
                          key={time?.id}
                          onClick={() => toggleHourId(time?.id)}
                          disabled={!isActive}
                          className={`${baseClasses} ${stateClasses}`}
                        >
                          <div className="flex items-center justify-center">
                            <img
                              src={time?.imgSrc}
                              className="h-6 w-6 fill-red-800"
                            />
                          </div>
                          <div>
                            <div className="text-left text-sm">
                              {time?.name}
                            </div>
                            <div className="text-[10px]">{time?.label}</div>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            type="single"
            collapsible
            defaultValue="place"
            value={selectedHourId ? "place" : ""}
          >
            <AccordionItem value="place">
              <AccordionTrigger>
                <div className="flex flex-row items-center gap-1">
                  <img src={threeIcon} alt="three-icon" />
                  <h3 className="text-base font-semibold text-[#130E67]">
                    Session Type
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mt-[18px] flex flex-row gap-3">
                  {sessionTypeData &&
                    hoursScheduleData &&
                    sessionTypes?.map((session: sessionType) => {
                      const isActive = sessionTypeData?.some(
                        (item) => item.id === session.id,
                      );
                      const isSelected = selectedSessionId === session?.id;
                      const baseClasses =
                        "flex h-[131px] w-[171px] flex-col items-center justify-center gap-[6px] rounded-xl border-[1px] transition-colors";

                      const stateClasses = !isActive
                        ? "border-[#D1D1D1] text-[#D1D1D1] cursor-not-allowed"
                        : isSelected
                          ? "border-[#958FEF] bg-[#DDD8FA] text-[#4F46E5]"
                          : "border-[#D1D1D1] bg-white text-[#292929]";
                      return (
                        <div key={session?.id}>
                          <button
                            onClick={() => toggleSessionId(session?.id)}
                            disabled={!isActive}
                            className={`${baseClasses} ${stateClasses}`}
                          >
                            <img src={session?.imgSrc} className="h-6 w-6" />
                            <div className="text-[16px] font-semibold">
                              {session?.label}
                            </div>
                            <div className="flex flex-row gap-[1.5px] text-sm">
                              {session?.id > 1 && (
                                <img src={pinIcon} className="w-3" />
                              )}
                              {Array.isArray(sessionTypeData)
                                ? (sessionTypeData?.find(
                                    (item) => item.id === session.id,
                                  )?.location ?? session?.location)
                                : session?.location}
                            </div>
                            <div
                              className={`text-sm ${isActive ? "text-[#736BEA]" : ""}`}
                            >
                              {session?.price}
                            </div>
                          </button>
                          <div className="text-center text-[12px]">
                            {sessionAvailableMessage(
                              Array.isArray(sessionTypeData)
                                ? (sessionTypeData?.find(
                                    (item) => item.id === session.id,
                                  )?.availableSeats ?? 0)
                                : 0,
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="rounded-xl border-[1px] border-gray-200 p-10">
            <div className="flex flex-row items-center justify-between">
              <div className="text-[20px] font-semibold text-[#8A8A8A]">
                Total Price
              </div>
              <div className="text-[32px] font-semibold text-[#292929]">
                $ {totalPrice}
              </div>
            </div>
            <div className="mt-8 flex flex-row items-center justify-between">
              <div className="text-[16px] font-semibold text-[#8A8A8A]">
                Base Price
              </div>
              <div className="text-[16px] font-semibold text-[#292929]">
                + ${base}
              </div>
            </div>
            <div className="mt-3 flex flex-row items-center justify-between">
              <div className="text-[16px] font-semibold text-[#8A8A8A]">
                Session Type
              </div>
              <div className="text-[16px] font-semibold text-[#292929]">
                + ${sessionPrice}
              </div>
            </div>
            <button
              className="mt-8 h-[63px] w-[450px] rounded-xl bg-[#281Ed2] font-semibold text-[#FFFFFF] disabled:bg-[#EEEDFC] disabled:text-[#B7B3F4]"
              onClick={handleCourseEnroll}
              type="button"
              disabled={
                !selectedHourId ||
                !selectedId ||
                !selectedSessionId ||
                !(
                  (sessionTypeData?.find(
                    (item) => item.id === selectedSessionId,
                  )?.availableSeats ?? 0) > 0
                )
              }
            >
              Enroll Now
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
