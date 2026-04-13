import { Link } from "react-router";
import rocketIcon from "@/assets/rocket.png";
import starstIcon from "@/assets/stars.png";
import bookIcon from "@/assets/book.png";
import userIcon from "@/assets/user.png";
import LogInModal from "./components/LogInModal";
import ProfileModal from "./components/ProfileModal";
import { useAtomValue } from "jotai";
import { isAuthenticatedAtom, userProfileAtom } from "../../state";

const Header = () => {
  const userInfo = useAtomValue(userProfileAtom);
  const isAuth = useAtomValue(isAuthenticatedAtom);

  const notCompleteProfile =
    !userInfo?.age || !userInfo?.fullName || !userInfo?.mobileNumber;
  return (
    <div className="flex h-[108px] w-full items-center justify-between border-b-2 border-[#D1D1D1] px-[177px]">
      <Link to="/">
        <div className="flex flex-row">
          <img src={rocketIcon} alt="logo" className="h-[60px] w-[60px]" />
        </div>
      </Link>
      <div className="flex gap-6 font-medium">
        <button>
          <div className="flex flex-row gap-3">
            <img
              src={starstIcon}
              alt="logo"
              className="h-[26px] w-[26px] text-lg"
            />
            Browse Courses
          </div>
        </button>
        {!isAuth && (
          <div className="flex gap-[15px]">
            <LogInModal>
              <button className="h-[60px] w-[125px] rounded-[8px] border-2 border-[#958FEF] text-[20px] font-medium text-[#4F46E5]">
                Log In
              </button>
            </LogInModal>
            <button className="h-[60px] w-[125px] rounded-[8px] bg-[#4F46E5] text-[20px] font-medium text-[#FFFFFF]">
              Sign Up
            </button>
          </div>
        )}

        {isAuth && (
          <>
            <button>
              <div className="flex flex-row gap-3">
                <img
                  src={bookIcon}
                  alt="logo"
                  className="h-[26px] w-[26px] text-lg"
                />
                Enrolled Courses
              </div>
            </button>
            <ProfileModal
              userInfo={{
                ...userInfo,
                age: userInfo?.age ?? "",
                mobileNumber: userInfo?.mobileNumber ?? "",
              }}
              notCompleteProfile={notCompleteProfile}
            >
              <button>
                <div className="relative">
                  {userInfo?.avatar ? (
                    <>
                      <img
                        src={userInfo?.avatar}
                        alt="logo"
                        className="h-[56px] w-[56px] rounded-full text-lg"
                      />
                    </>
                  ) : (
                    <div className="rounded-full bg-[#EEEDFC] p-2">
                      <img
                        src={userIcon}
                        alt="logo"
                        className="h-[26px] w-[26px] text-lg"
                      />
                    </div>
                  )}
                  <div
                    className={`absolute bottom-0 right-0 h-[15px] w-[15px] rounded-full border-[2px] border-[#FFFFFF] text-red-800 ${notCompleteProfile ? "bg-[#F4A316]" : "bg-[#1DC31D]"}`}
                  ></div>
                </div>
              </button>
            </ProfileModal>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
