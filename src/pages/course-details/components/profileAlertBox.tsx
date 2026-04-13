import right_arrow_blue from "@/assets/right_arrow_blue.svg";
import triangleIcon from "@/assets/triangle.svg";
import type { ProfileAlertBoxProps } from "./types";

const ProfileAlertBox: React.FC<ProfileAlertBoxProps> = ({
  alertTitle,
  alertMessage,
  buttonText,
  buttonAction,
}) => {
  return (
    <div className="flex h-[102px] w-[530px] flex-row items-center gap-[29px] rounded-xl border-[1px] border-[#E5E7EB] bg-white p-5">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-[6px]">
          <img src={triangleIcon} className="h-[22px] w-[22px]" />
          <div className="font-medium text-[#292929]">{alertTitle}</div>
        </div>
        <div className="text-xs text-[#8A8A8A]">{alertMessage}</div>
      </div>
      <div>
        <button
          onClick={buttonAction}
          className="flex flex-row items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#EEEDFC] px-[18.5px] py-[10px] text-sm text-[#281Ed2]"
        >
          {buttonText}
          <img
            src={right_arrow_blue}
            alt="right-arrow"
            className="h-[10px] w-[12px]"
          />
        </button>
      </div>
    </div>
  );
};

export default ProfileAlertBox;
