import { useNavigate } from "react-router-dom";
import { useGetCoursesList } from "../../react-query/query/courses/coursesQuery";
import starIcon from "@/assets/star.png";
import codeIcon from "@/assets/code.svg";
import closeIcon from "@/assets/close.svg";
import arrow_down from "@/assets/arrow_down.svg";
import {
  useGetCategories,
  useGetInstructors,
  useGetTopic,
} from "../../react-query/query/filters/filtersQuery";
import { useMemo, useState } from "react";
import type { Category, Instructor, Topic } from "../../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { getPaginationRange } from "./components/utils";

const CoursesListPage = () => {
  type FiltersState = {
    categories: number[];
    topics: number[];
    instructors: number[];
  };
  const defaultFilterObj = {
    categories: [],
    topics: [],
    instructors: [],
  };

  const [filters, setFilters] = useState<FiltersState>(defaultFilterObj);
  const [sort, setSort] = useState<
    "newest" | "price_asc" | "price_desc" | "popular" | "title_asc"
  >("newest");
  const [page, setPage] = useState(1);
  const toggleFilter = (key: keyof FiltersState, id: number) => {
    setFilters((prev) => {
      const currentArray = prev[key];

      return {
        ...prev,
        [key]: currentArray.includes(id)
          ? currentArray.filter((item) => item !== id)
          : [...currentArray, id],
      };
    });
  };
  const categoriesFilterHandle = (category: Category) => {
    toggleFilter("categories", category.id);
  };

  const topicsFilterHandle = (topic: Topic) => {
    toggleFilter("topics", topic.id);
  };

  const instructorFilterHandle = (instructors: Instructor) => {
    toggleFilter("instructors", instructors.id);
  };
  const { data: coursesResponse } = useGetCoursesList({
    categories: filters?.categories,
    topics: filters?.topics,
    instructors: filters?.instructors,
    sort: sort,
    page: page,
  });
  const coursesList = coursesResponse?.data;
  const meta = coursesResponse?.meta;
  const pages = getPaginationRange(page, meta?.lastPage || 1);

  const activeFilters =
    filters?.categories.length +
    filters?.topics.length +
    filters?.instructors.length;
  const { data: categoriesData } = useGetCategories();
  const { data: instructorData } = useGetInstructors();
  const { data: topicData } = useGetTopic();

  const navigate = useNavigate();
  const SORT_LABELS = {
    newest: "Newest First",
    price_asc: "Price: Low to High",
    price_desc: "Price: High to Low",
    popular: "Most Popular",
    title_asc: "Title A-Z",
  };
  const filteredTopics = useMemo(() => {
    if (filters.categories.length === 0) return topicData;
    if (!coursesList) return [];
    const uniqueTopicsMap = new Map();

    coursesList.forEach((course) => {
      if (course.topic) {
        uniqueTopicsMap.set(course.topic.id, course.topic);
      }
    });

    return Array.from(uniqueTopicsMap.values());
  }, [coursesList, filters.categories.length, topicData]);
  return (
    <div className="flex flex-row gap-[75px] px-[177px] py-16 text-[#525252]">
      <section className="w-[309px]">
        <div className="mb-[34px] text-[18px] font-medium">
          Home &#10095;
          <span className="text-[#4F46E5]"> &nbsp; Browse</span>
        </div>
        <div className="flex flex-row justify-between">
          <h2 className="mb-8 text-[2.5rem] font-semibold text-[#0A0A0A]">
            Filters
          </h2>
          <div
            className="h-[40px] cursor-pointer rounded-xl p-2 text-[#8A8A8A] hover:text-[#4F46E5]"
            onClick={() => setFilters(defaultFilterObj)}
          >
            Clear All Filters
            <img
              src={closeIcon}
              alt="x-icon"
              className="ml-[7px] inline-block h-[15px] w-[15px]"
            />
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-[56px]">
          <div className="flex flex-col gap-6">
            <h3>Categories</h3>
            <div className="flex flex-row flex-wrap gap-2">
              {categoriesData?.map((category) => (
                <div
                  key={category?.id}
                  onClick={() => {
                    categoriesFilterHandle(category);
                  }}
                  className={`flex w-fit cursor-pointer flex-row items-center gap-[10px] rounded-xl border-[1px] px-3 py-2 hover:bg-[#DDDBFA] ${
                    filters.categories.includes(category.id)
                      ? "border-[#281ED2] bg-[#EEEDFC]"
                      : "border-transparent bg-white"
                  } `}
                >
                  <img
                    src={codeIcon}
                    alt="code-icon"
                    className="inline-block h-[17px] w-[17px]"
                  />
                  <div>{category?.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h3>Topics</h3>
            <div className="flex flex-row flex-wrap gap-2">
              {filteredTopics?.map((topic) => (
                <div
                  key={topic?.id}
                  onClick={() => topicsFilterHandle(topic)}
                  className={`flex w-fit cursor-pointer flex-row items-center gap-[10px] rounded-xl border-[1px] px-3 py-2 hover:bg-[#DDDBFA] ${
                    filters.topics.includes(topic.id)
                      ? "border-[#281ED2] bg-[#EEEDFC]"
                      : "border-transparent bg-white"
                  } `}
                >
                  {topic?.name}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h3>Instructor</h3>
            <div className="flex flex-row flex-wrap gap-2">
              {instructorData?.map((instructor) => (
                <div
                  key={instructor?.id}
                  onClick={() => instructorFilterHandle(instructor)}
                  className={`flex w-fit cursor-pointer flex-row items-center gap-3 whitespace-nowrap rounded-xl border-[1px] p-2 hover:bg-[#DDDBFA] ${
                    filters.instructors.includes(instructor.id)
                      ? "border-[#281ED2] bg-[#EEEDFC]"
                      : "border-transparent bg-white"
                  } `}
                >
                  <img
                    src={instructor?.avatar}
                    alt="insctructor-image"
                    className="mr-1 h-[30px] w-[30px] rounded-[4px] object-cover"
                  />
                  <div className="text-base font-medium">
                    {instructor?.name ?? "N/A"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 border-t-[1px] border-[#ADADAD] pt-4 text-sm text-[#8A8A8A]">
          {activeFilters} Filters Active
        </div>
      </section>
      <section className="mt-[51px] flex-1">
        <div className="mb-8 flex items-center justify-between">
          <div className="font-medium text-[#666666]">
            Showing {coursesList?.length} out of {meta?.total}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-[49px] min-w-[234px] flex-row items-center justify-center gap-2 rounded-[10px] border-[#F5F5F5] bg-white px-5 hover:bg-[#DDD8FA] focus:outline-none">
                <div className="text-base font-normal">
                  Sort By:{" "}
                  <span className="text-[#4F46E5]">{SORT_LABELS[sort]}</span>
                </div>
                <img
                  src={arrow_down}
                  className="w-[20px]"
                  alt="arrow-down-icon"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="h-[233px] w-[234px] overflow-y-hidden bg-white p-0"
            >
              <DropdownMenuItem
                onClick={() => {
                  setSort("newest");
                }}
                className="h-[44px] pl-5 text-base hover:bg-[#DDD8FA] hover:text-[#4F46E5] hover:outline-none"
              >
                Newer First
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSort("price_asc");
                }}
                className="h-[44px] pl-5 text-base hover:bg-[#DDD8FA] hover:text-[#4F46E5] hover:outline-none"
              >
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSort("price_desc");
                }}
                className="h-[44px] pl-5 text-base hover:bg-[#DDD8FA] hover:text-[#4F46E5] hover:outline-none"
              >
                Price, High to Low
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSort("popular");
                }}
                className="h-[44px] pl-5 text-base hover:bg-[#DDD8FA] hover:text-[#4F46E5] hover:outline-none"
              >
                Most Popular
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSort("title_asc");
                }}
                className="h-[44px] pl-5 text-base hover:bg-[#DDD8FA] hover:text-[#4F46E5] hover:outline-none"
              >
                Title A-Z
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mx-auto flex flex-row flex-wrap gap-6">
          {coursesList &&
            coursesList?.map((course) => (
              <div
                key={course?.id}
                className="flex min-h-[451px] w-[373px] flex-col justify-between rounded-xl bg-white p-5"
              >
                <img
                  src={course?.image}
                  alt="course-photo"
                  className="h-[181px] w-[333px] rounded-xl"
                />
                <div className="my-4">
                  <div className="flex w-full flex-row items-center justify-between text-[14px] font-medium text-[#666666]">
                    <p className="text-[#ADADAD]">
                      {course?.instructor?.name} | {course?.durationWeeks} Weeks
                    </p>
                    <div className="flex flex-row items-center gap-1">
                      <img
                        src={starIcon}
                        alt="star-icon"
                        className="inline-block h-[17px] w-[17px]"
                      />
                      <div>{course?.avgRating ?? "N/A"}</div>
                    </div>
                  </div>
                  <h2 className="mt-[12px] text-2xl font-semibold text-[#141414]">
                    {course?.title}
                  </h2>
                </div>
                <div className="flex w-fit flex-row items-center gap-[10px] rounded-xl bg-[#f5f5f5] px-3 py-2 hover:bg-[#DDDBFA]">
                  <img
                    src={codeIcon}
                    alt="code-icon"
                    className="inline-block h-[17px] w-[17px]"
                  />
                  <div>{course?.category?.name}</div>
                </div>
                <div className="mt-6 flex flex-row justify-between">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-xs text-[#999999]">Starting From</div>
                    <div className="text-2xl font-semibold text-[#3D3D3D]">
                      ${course?.basePrice}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/courses/${course?.id}`)}
                    className="flex h-[48px] w-[103px] items-center justify-center rounded-lg border-2 bg-[#4F46E5] text-base font-medium text-[#FFFFFF]"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
        </div>
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className={`h-[40px] w-[40px] cursor-pointer rounded border-[1px] border-[#D1D1D1] hover:bg-[#B7B3F4] ${page === 1 ? "pointer-events-none opacity-50" : "text-[#4F46E5]"}`}
              />
            </PaginationItem>

            {pages.map((p, index) => (
              <PaginationItem key={index}>
                {p === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={p === page}
                    onClick={() => setPage(p)}
                    className={`h-[40px] w-[40px] cursor-pointer rounded border-[1px] border-[#D1D1D1] text-base font-medium hover:bg-[#B7B3F4] ${page === p ? "pointer-events-none bg-[#281Ed2] text-white" : "text-[#4F46E5]"}`}
                  >
                    {p}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* NEXT */}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, meta?.lastPage || 1))
                }
                className={`h-[40px] w-[40px] cursor-pointer rounded border-[1px] border-[#D1D1D1] hover:bg-[#B7B3F4] ${page === 3 ? "pointer-events-none opacity-50" : "text-[#4F46E5]"}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </div>
  );
};

export default CoursesListPage;
