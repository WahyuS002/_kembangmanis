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
