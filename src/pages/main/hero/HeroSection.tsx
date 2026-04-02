import heroImg from "@/assets/hero.png";

const HeroSection = () => {
  return (
    <div>
      <div className="relative">
        <img
          src={heroImg}
          alt="hero"
          className="h-[420px] w-full rounded-[30px] object-cover"
        />
        <div className="absolute top-0 mx-12 mt-12 space-y-3 font-bold text-[#ffffff]">
          <h1 className="text-2xl font-bold">
            Start learning something new today
          </h1>
          <p className="max-w-[850px] font-light">
            Explore a wide range of expert-led courses in design, development,
            business, and more. Find the skills you need to grow your career and
            learn at your own pace.
          </p>
          <button className="mt-7">Browse Courses</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
