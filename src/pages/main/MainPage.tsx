import ContinueLearningSection from "./continue-learning/ContinueLearningSection";
import HeroSection from "./hero/HeroSection";
import StartLearningSection from "./start-learning/StartLearningSection";

const MainPage = () => {
  return (
    <div className="flex flex-col gap-16 px-[177px] py-16">
      <HeroSection />
      <ContinueLearningSection />
      <StartLearningSection />
    </div>
  );
};

export default MainPage;
