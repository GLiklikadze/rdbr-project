import coursePhoto from "@/assets/rocket.png";
import starIcon from "@/assets/star.png";
const ContinueLearningBox = () => {
  const completePercentage = 65;
  return (
    <div className="h-[219px] w-[506px] rounded-xl bg-[#FFFFFF] p-5">
      <div className="flex flex-row gap-4">
        <img
          src={coursePhoto}
          alt="course-photo"
          className="h-[123px] w-[140px] rounded-xl"
        />
        <div>
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
          <h2 className="font-semibold text-[#141414]">
            Advanced React & Typescript Development
          </h2>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="mt-[17px] flex flex-col">
          <div className="text-xs text-[#141414]">65% Completed</div>
          <div className="h-[15px] w-[336px] rounded-[30px] bg-[#DDDBFA]">
            <div
              className={`h-[15px] rounded-[30px] bg-[#4F46E5]`}
              style={{ width: `${completePercentage}%` }}
            ></div>
          </div>
        </div>
        <button className="rounded-lg border-2 border-[#958FEF] px-5 text-base text-[#958FEF]">
          View
        </button>
      </div>
    </div>
  );
};

export default ContinueLearningBox;
