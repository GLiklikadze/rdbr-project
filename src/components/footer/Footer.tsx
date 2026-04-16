import rocketIcon from "@/assets/rocket.png";
import fbIcon from "@/assets/facebook.svg";
import twitterIcon from "@/assets/twitter.svg";
import instagramIcon from "@/assets/instagram.svg";
import linkedinIcon from "@/assets/linkedin.svg";
import youtubeIcon from "@/assets/youtube.svg";
import mailIcon from "@/assets/mail.svg";
import phoneIcon from "@/assets/phone.svg";
import pinIcon from "@/assets/pin.svg";
import { Link } from "react-router-dom";
import { isProfileModalOpenAtom } from "../../state";
import { useAtom } from "jotai";

const Footer = () => {
  const [, setIsOpenProfileModal] = useAtom(isProfileModalOpenAtom);
  return (
    <div className="flex h-[334px] w-full flex-col gap-[74px] border-t-[1px] border-[#D1D1D1] px-[177px] pt-[80px]">
      <div className="flex flex-row justify-between">
        <div>
          <div className="mb-[16px] flex flex-row items-center gap-3 text-2xl font-medium text-[#130E67]">
            {" "}
            <img src={rocketIcon} alt="logo" className="h-[60px] w-[60px]" />
            Bootcamp
          </div>
          <div className="mb-[24px] text-sm font-medium text-[#130E67]">
            Your Learning journey starts here!
            <div className="mb-[24px] text-sm font-medium">
              Browse courses to get started here.
            </div>
          </div>
          <div className="flex flex-row gap-[22px]">
            <div>
              <img src={fbIcon} alt="fb-icon" className="h-[19px] w-[19px]" />
            </div>
            <div>
              <img
                src={twitterIcon}
                alt="twitter-icon"
                className="h-[19px] w-[19px]"
              />
            </div>
            <div>
              <img
                src={instagramIcon}
                alt="insta-icon"
                className="h-[19px] w-[19px]"
              />
            </div>
            <div>
              <img
                src={linkedinIcon}
                alt="insta-icon"
                className="h-[19px] w-[19px]"
              />
            </div>
            <div>
              <img
                src={youtubeIcon}
                alt="youtube-icon"
                className="h-[19px] w-[19px]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-[120px] text-lg">
          <div className="space-y-[10px]">
            <div className="mb-4 text-xl font-semibold text-[#130E67]">
              Explore
            </div>
            <Link to="/courses">Browse Courses</Link>
            <div>Enrolle Courses</div>
          </div>
          <div>
            <div className="mb-4 text-xl font-semibold text-[#130E67]">
              Account
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setIsOpenProfileModal(true)}
            >
              My profile
            </div>
          </div>
          <div className="space-y-[10px]">
            <div className="mb-4 text-xl font-semibold text-[#130E67]">
              Contact
            </div>
            <div className="flex flex-row items-center gap-2">
              <img
                src={mailIcon}
                alt="mail-icon"
                className="inline-block h-[19px] w-[19px]"
              />
              <a href="mailto:contact@company.com">contact@company.com</a>
            </div>
            <div className="flex flex-row items-center gap-2">
              <img
                src={phoneIcon}
                alt="phone-icon"
                className="inline-block h-[19px] w-[19px]"
              />
              <a href="tel:+995555111222">(+995) 555 111 222</a>
            </div>

            <div className="flex flex-row items-center gap-2 text-lg">
              <img
                src={pinIcon}
                alt="pin-icon"
                className="inline-block h-[19px] w-[19px]"
              />
              <a href="https://maps.app.goo.gl/pLAdtSDzZZtAogDS7">
                Aghmashenebeli St.115
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between pb-[20px]">
        <div>Copyright © 2026 Redberry International</div>
        <div>
          <div>
            All Rights Reserved |
            <span className="text-[#4F46E5]"> Terms and Conditions</span> |{" "}
            <span className="text-[#4F46E5]">Privacy Policy</span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
