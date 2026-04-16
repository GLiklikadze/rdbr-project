import { useAtomValue } from "jotai";
import { isAuthenticatedAtom } from "../../state";
import ContinueLearningSection from "./continue-learning/ContinueLearningSection";
import HeroSection from "./hero/HeroSection";
import StartLearningSection from "./start-learning/StartLearningSection";
import ContinueLearningSectionAuth from "./continue-learning/ContinueLearninSectionAuth";

const MainPage = () => {
  const isAuth = useAtomValue(isAuthenticatedAtom);
  return (
    <div className="flex flex-col gap-16 px-[177px] py-16 pb-32">
      <HeroSection />
      {isAuth && <ContinueLearningSectionAuth />}
      <StartLearningSection />
      {!isAuth && <ContinueLearningSection />}
    </div>
  );
};

export default MainPage;
