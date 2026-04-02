import { Link } from "react-router";
import rocketIcon from "@/assets/rocket.png";
import starstIcon from "@/assets/stars.png";
import bookIcon from "@/assets/book.png";
import userIcon from "@/assets/user.png";

const Header = () => {
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

        <button>
          <div className="flex rounded-full bg-[#EEEDFC] p-2">
            <img
              src={userIcon}
              alt="logo"
              className="h-[26px] w-[26px] text-lg"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
