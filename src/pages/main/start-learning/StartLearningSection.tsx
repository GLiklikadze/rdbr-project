import StartLearningBox from "./StartLearningBox";

const StartLearningSection = () => {
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
        <StartLearningBox />
        <StartLearningBox />
        <StartLearningBox />
      </div>
    </div>
  );
};

export default StartLearningSection;
