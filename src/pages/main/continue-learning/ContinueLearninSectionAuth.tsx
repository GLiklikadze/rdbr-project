import { useAtom, useAtomValue } from "jotai";
import { useGetEnrolledList } from "../../../react-query/query/enrollments/enrollementsQuery";
import {
  EnrolledDrawerOpen,
  isAuthenticatedAtom,
  isCompleteProfileAtom,
} from "../../../state";
import ContinueLearningBoxAuth from "./ContinueLearningBoxAuth";

const ContinueLearningSectionAuth = () => {
  const [, setDrawerOpen] = useAtom(EnrolledDrawerOpen);
  const { data: enrolledList } = useGetEnrolledList();
  const isAuth = useAtomValue(isAuthenticatedAtom);
  const isComplete = useAtomValue(isCompleteProfileAtom);
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
          <div
            className="cursor-pointer text-[#4F46E5] underline"
            onClick={() => isAuth && isComplete && setDrawerOpen(true)}
          >
            See All
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-6">
        {enrolledList?.slice(0, 3)?.map((enrolled) => (
          <ContinueLearningBoxAuth enrolled={enrolled} />
        ))}
      </div>
    </div>
  );
};

export default ContinueLearningSectionAuth;
