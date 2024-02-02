"use client";

import { FC } from "react";
import { Drawer } from "vaul";
import { HiOutlineSparkles } from "react-icons/hi";
import { addHaiku } from "./actions";
import { useFormState } from "react-dom";
import { HaikuInput } from "../HaikuForm/HaikuInput";
import { HaikuFileInput } from "../HaikuForm/HaikuFileInput";
import { HaikuLocationInput } from "../HaikuForm/HaikuLocationInput";
import { useUser } from "@/providers/UserProvider";

export const HaikuDrawer: FC = () => {
  const [addHaikuState, addHaikuAction] = useFormState(addHaiku, null);
  const { user } = useUser();

  if (!user) return null;

  return (
    <Drawer.Root>
      <div className="fixed bottom-6 right-6">
        <Drawer.Trigger className="flex items-center gap-1 bg-neutral-900 text-neutral-50 px-4 py-2 font-semibold font-sans rounded-sm text-lg">
          <HiOutlineSparkles />
          Add a new one
        </Drawer.Trigger>
      </div>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-neutral-800 rounded-t-md flex flex-col max-h-[96%] mt-24 max-w-breakout mx-auto fixed bottom-0 left-0 right-0 font-sans">
          <div data-vaul-no-drag="" className="overflow-auto p-8 md:p-12">
            <h3 className="text-neutral-500">Your new beautiful haiku:</h3>

            <form
              className="flex flex-col gap-2"
              action={async (formData) => {
                const result = await addHaiku(null, formData);

                console.log(result);
              }}
            >
              <HaikuInput type="text" name="firstLine" />
              <HaikuInput type="text" name="secondLine" />
              <HaikuInput type="text" name="thirdLine" />
              <HaikuLocationInput type="text" name="location" />
              <HaikuFileInput
                accept="image/png, image/gif, image/jpeg"
                name="photo"
              />

              <Drawer.Close asChild>
                <button
                  className="bg-neutral-900 text-neutral-50 px-4 py-2 font-semibold font-sans rounded-sm text-lg mt-12"
                  type="submit"
                >
                  Create
                </button>
              </Drawer.Close>
            </form>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
