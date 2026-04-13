import heroImg from "@/assets/hero.png";
import heroImg2 from "@/assets/hero2.png";
import heroImg3 from "@/assets/hero3.png";
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const heroData = [
    {
      heading: "Start learning something new today",
      description:
        "Explore a wide range of expert-led courses in design, development, business, and more. Find the skills you need to grow your career and learn at your own pace.",
      button: "Browse Courses",
      img: heroImg,
    },
    {
      heading: "Pick up where you left off",
      description:
        "Your learning journey is already in progress. Continue your enrolled courses, track your progress, and stay on track toward completing your goals.",
      button: "Start Learning",
      img: heroImg2,
    },
    {
      heading: "Learn together, grow faster",
      description: "",
      button: "Learn More",
      img: heroImg3,
    },
  ];
  const handlePrevSlide = () => {
    if (heroIndex > 0) {
      setHeroIndex((currentIndex) => currentIndex - 1);
    }
  };
  const handleNextSlide = () => {
    if (heroIndex < 2) {
      setHeroIndex((currentIndex) => currentIndex + 1);
    }
  };
  return (
    <div className="relative">
      <img
        src={heroData?.[heroIndex].img}
        alt="hero"
        className="h-[420px] w-full rounded-[30px] object-cover"
      />
      <div className="absolute top-0 mt-12 flex w-full flex-col px-12 font-bold text-[#ffffff]">
        <div className="flex w-full flex-col">
          <h1 className="text-2xl text-[48px] font-bold">
            {heroData?.[heroIndex].heading}
          </h1>
          <p className="mb-10 mt-3 h-[60px] w-full pr-[230px] text-[24px] font-light">
            {heroData?.[heroIndex].description}
          </p>
          <button className="h-[64px] w-[206px] rounded-lg bg-[#4F46E5] font-medium">
            {heroData?.[heroIndex].button}
          </button>
        </div>
        <div className="mt-[54px] flex w-full flex-row items-center">
          <div className="flex flex-1 justify-center gap-3">
            <div
              className={`h-[8px] w-[57px] rounded-full ${heroIndex === 0 ? "bg-[#F5F5F5]" : "bg-[#C1BCBC] bg-opacity-50"} `}
            ></div>
            <div
              className={`h-[8px] w-[57px] rounded-full ${heroIndex === 1 ? "bg-[#F5F5F5]" : "bg-[#C1BCBC] bg-opacity-50"} `}
            ></div>
            <div
              className={`h-[8px] w-[57px] rounded-full ${heroIndex === 2 ? "bg-[#F5F5F5]" : "bg-[#C1BCBC] bg-opacity-50"} `}
            ></div>
          </div>
          <div className="flex flex-row justify-end gap-[29px]">
            <button onClick={handlePrevSlide}>
              <ChevronLeftCircleIcon
                className={`h-[43px] w-[43px] ${heroIndex === 0 ? "text-[#C1BCBC] text-opacity-50" : "text-[#FFFFFF]"}`}
                strokeWidth={1.3}
              />
            </button>
            <button onClick={handleNextSlide}>
              <ChevronRightCircleIcon
                strokeWidth={1.3}
                className={`h-[43px] w-[43px] ${heroIndex === 2 ? "text-[#C1BCBC] text-opacity-50" : "text-[#FFFFFF]"}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
