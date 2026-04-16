import designIcon from "@/assets/design.svg";
import businessIcon from "@/assets/business.svg";
import scienceIcon from "@/assets/science.svg";
import marketingIcon from "@/assets/marketing.svg";
import codeIcon from "@/assets/code.svg";

export const getPaginationRange = (current: number, total: number) => {
  const delta = 1;
  const pages: (number | "...")[] = [];

  pages.push(1);

  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  if (left > 2) {
    pages.push("...");
  }

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < total - 1) {
    pages.push("...");
  }

  if (total > 1) {
    pages.push(total);
  }

  return pages;
};

export const categoryIcons = [
  {
    id: 1,
    icon: codeIcon,
  },
  {
    id: 2,
    icon: designIcon,
  },
  {
    id: 3,
    icon: businessIcon,
  },
  {
    id: 4,
    icon: marketingIcon,
  },
  {
    id: 5,
    icon: scienceIcon,
  },
];
