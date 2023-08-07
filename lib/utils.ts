import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  const formattedDate = format(parsedDate, "dd LLL, yyyy");
  return formattedDate;
};

export const truncate = (
  str: string,
  n: number,
  useWordBoundary: boolean
): string => {
  if (str.length <= n) {
    return str;
  }
  const subString = str.slice(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(" "))
      : subString) + "…"
  ); // Use ellipsis character instead of HTML entity
};
