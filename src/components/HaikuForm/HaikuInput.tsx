import { tw } from "@/utils/tw";
import { ForwardedRef, HTMLProps, forwardRef } from "react";

interface HaikuInputProps extends HTMLProps<HTMLInputElement> {}

export const HaikuInput = forwardRef<HTMLInputElement, HaikuInputProps>(
  (props, ref) => (
    <input
      ref={ref}
      {...props}
      className={tw(
        "bg-transparent placeholder:text-neutral-700 hover:placeholder:text-neutral-500 border-b-neutral-700 border-b text-white text-center p-6 focus:outline-none hocus:border-b-green-200 transition-[border-color] text-xl font-serif",
        props.className
      )}
    />
  )
);

HaikuInput.displayName = "HaikuInput";
