import { useAtom } from "jotai";
import { isLoginModalOpenAtom } from "../../../state";
import ContinueLearningBox from "./ContinueLearningBox";
import lockedImg from "@/assets/locked.png";

const ContinueLearningSection = () => {
  const [, setIsLoginOpen] = useAtom(isLoginModalOpenAtom);
  return (
    <div className="relative">
      <div className="flex flex-col gap-8 blur-sm">
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
      <div className="absolute left-1/2 top-1/2 flex h-[233px] w-[418px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-xl bg-white">
        <img
          src={lockedImg}
          alt="locked-img"
          className="mt-[27px] h-[77px] w-[74px]"
        />
        <div className="mb-6 mt-4 text-center font-medium text-[#0A0836]">
          {" "}
          Sign in to track your learning progress
        </div>
        <button
          onClick={() => setIsLoginOpen(true)}
          className="mx-auto inline-block h-[42px] w-[83px] rounded-[8px] bg-[#4F46E5] font-medium text-[#FFFFFF]"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default ContinueLearningSection;
