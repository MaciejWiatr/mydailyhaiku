"use server";

import { revalidatePath } from "next/cache";
import { uploadPhoto } from "@/utils/storage.utils";
import { db } from "@kysely/client";
import { Haiku } from "@kysely/types";
import { Insertable } from "kysely";

type AddHaikuResponse =
  | { status: "success"; haiku: Insertable<Haiku> }
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

  const inserted = await db
    .insertInto("haiku")
    .values({
      firstLine,
      secondLine,
      thirdLine,
      location,
      photoUrl,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  revalidatePath("/");

  return { status: "success", haiku: inserted };
}
