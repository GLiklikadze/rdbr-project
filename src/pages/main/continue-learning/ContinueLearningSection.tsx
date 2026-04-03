import ContinueLearningBox from "./ContinueLearningBox";

const ContinueLearningSection = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <h2 className="text-[40px] font-semibold text-[#0A0A0A]">
          Continue Learning
        </h2>
        <div className="flex flex-row justify-between">
          <p className="text-[18px] font-normal text-[#3D3D3D]">
            Pick up where you left
          </p>
          <div className="text-[#4F46E5] underline">See All</div>
        </div>
      </div>
      <div className="flex flex-row gap-6">
        <ContinueLearningBox />
        <ContinueLearningBox />
        <ContinueLearningBox />
      </div>
    </div>
  );
};

export default ContinueLearningSection;
