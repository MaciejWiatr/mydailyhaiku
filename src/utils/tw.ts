import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export const tw = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
