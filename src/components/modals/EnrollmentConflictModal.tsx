import { useAtom } from "jotai";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { isConflictModalOpenAtom } from "../../state";
import triangleIcon from "@/assets/triangle.svg";
import { useEnrolleCourse } from "../../react-query/mutation/enrollments/enrollmentsMutation";
import type { EnrollmentConflictModalProps } from "../../types";
import { useQueryClient } from "@tanstack/react-query";

const EnrollmentConflictModal = ({
  error,
  isError,
  courseId,
  courseScheduleId,
}: EnrollmentConflictModalProps) => {
  const [isConflictModalOpen, setIsConflictModalOpen] = useAtom(
    isConflictModalOpenAtom,
  );
  const queryClient = useQueryClient();
  const { mutate: enrolleCourseMutate } = useEnrolleCourse();
  if (!isError || !error) return null;

  const errorData = error.response?.data as
    | {
        message?: string;
        conflicts?: Array<{
          conflictingCourseName?: string;
          schedule?: string;
        }>;
      }
    | undefined;

  const handleForceEnrolle = () => {
    enrolleCourseMutate(
      {
        courseId: Number(courseId ?? 0),
        courseScheduleId: Number(courseScheduleId),
        force: true,
      },
      {
        onSuccess: () => {
          setIsConflictModalOpen(false);
          queryClient.invalidateQueries({ queryKey: ["get-single-course"] });
        },
      },
    );
  };

  return (
    <Dialog open={isConflictModalOpen} onOpenChange={setIsConflictModalOpen}>
      <DialogContent className="bg-[#FFFFFF] p-[60px] sm:h-[495px] sm:max-w-[476px]">
        <DialogHeader>
          <img src={triangleIcon} className="mx-auto mt-3 h-[94px] w-[94px]" />
          <DialogTitle className="mx-auto mb-[6px] mt-5 text-[32px] font-semibold text-[#141414]">
            Enrollment Conflict
          </DialogTitle>
          <DialogDescription className="mx-auto flex flex-col text-center text-[20px] font-medium leading-6 text-[#666666]">
            <div> {isError && errorData?.message}</div>
            <div>
              {isError && errorData?.conflicts?.[0].conflictingCourseName}
            </div>

            <div>{isError && errorData?.conflicts?.[0].schedule}</div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row gap-2 border-none">
          <button
            onClick={handleForceEnrolle}
            className="h-[58px] w-[174px] rounded-lg border-2 border-[#958FEF] px-4 py-2 text-[#5448C8]"
          >
            Continue Anyway
          </button>
          <button
            className="h-[58px] w-[174px] rounded-lg bg-[#4F46E5] px-4 py-2 text-white"
            onClick={() => setIsConflictModalOpen(false)}
          >
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentConflictModal;
