import coursePhoto from "@/assets/rocket.png";
import starIcon from "@/assets/star.png";

const StartLearningBox = () => {
  return (
    <div className="flex h-[576px] w-[506px] flex-col rounded-xl bg-[#FFFFFF] p-5">
      <img
        src={coursePhoto}
        alt="course-photo"
        className="h-[262px] w-[466px] rounded-xl"
      />
      <div className="my-4">
        <div className="flex w-full flex-row items-center justify-between text-[14px] font-medium text-[#666666]">
          <p>Lecturer Marilyn Mango</p>
          <div className="flex flex-row items-center gap-1">
            <img
              src={starIcon}
              alt="star-icon"
              className="inline-block h-[17px] w-[17px] -translate-y-[2px]"
            />

            <div>4.9</div>
          </div>
        </div>
        <h2 className="mt-[12px] text-2xl font-semibold text-[#141414]">
          Advanced React & Typescript Development
        </h2>
      </div>
      <p className="pr-16 text-base">
        Master modern React patterns, hooks, and TypeScript integration for
        building scalable web applications.
      </p>
      <div className="mt-6 flex flex-row justify-between">
        <div className="flex flex-row items-center gap-2">
          <div className="text-xs">Starting From</div>
          <div className="text-[32px] font-semibold text-[#141414]">$299</div>
        </div>
        <button className="rounded-lg border-2 bg-[#4F46E5] px-8 py-[14px] text-xl font-medium text-[#FFFFFF]">
          Details
        </button>
      </div>
    </div>
  );
};

export default StartLearningBox;
