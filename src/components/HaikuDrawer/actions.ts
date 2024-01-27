"use server";

import { prisma } from "@db/client";
import { Haiku } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { uploadPhoto } from "@/utils/storage.utils";

type AddHaikuResponse =
  | { status: "success"; haiku: Haiku }
  | { status: "error"; message: string };

export async function addHaiku(
  _: any,
  formData: FormData
): Promise<AddHaikuResponse> {
  const firstLine = formData.get("firstLine") as string;
  const secondLine = formData.get("secondLine") as string;
  const thirdLine = formData.get("thirdLine") as string;
  const location = formData.get("location") as string;
  const photo = formData.get("photo") as File;
  const { photoUrl } = await uploadPhoto(photo);

  const inserted = await prisma.haiku.create({
    data: { firstLine, secondLine, thirdLine, location, photoUrl },
  });

  revalidatePath("/");

  return { status: "success", haiku: inserted };
}
