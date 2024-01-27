"use client";

import { FC, ForwardedRef, HTMLProps, LegacyRef, useRef } from "react";
import { HaikuInput } from "./HaikuInput";
import { MdMyLocation } from "react-icons/md";
import { tw } from "@/utils/tw";

interface HaikuLocationInputProps extends HTMLProps<HTMLInputElement> {}

export const HaikuLocationInput: FC<HaikuLocationInputProps> = (props) => {
  const { className, ...inputProps } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const onLocationClick = async () => {
    const { current } = inputRef;

    if (!current) return;

    navigator.geolocation.getCurrentPosition((location) => {
      current.value = `${location?.coords.latitude}, ${location?.coords.longitude}`;
    });
  };

  return (
    <div className={tw("relative", className)}>
      <button
        type="button"
        className="text-neutral-700 text-2xl absolute hover:text-green-200 top-1/2 left-5 transform -translate-y-1/2"
        onClick={onLocationClick}
      >
        <MdMyLocation />
      </button>
      <HaikuInput
        ref={inputRef as any}
        {...inputProps}
        className="w-full text-left pl-14 font-sans"
        placeholder="Location"
      />
    </div>
  );
};
