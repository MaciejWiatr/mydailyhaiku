/* eslint-disable @next/next/no-img-element */
import { logout } from "@/auth/actions";
import { validateRequest } from "@/auth/lucia";
import { HaikuDrawer } from "@/components/HaikuDrawer";
import { displayDate } from "@/utils/date.utils";
import { tw } from "@/utils/tw";
import { db } from "@kysely/client";
import { Metadata } from "next";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export async function generateMetadata(): Promise<Metadata> {
  const haikusAmount = await db
    .selectFrom("haiku")
    .select(({ fn }) => fn.count<number>("haiku.id").as("haikuCount"))
    .executeTakeFirst();

  return {
    title: `Nifty collection of ${haikusAmount?.haikuCount} haikus written by Maciej Wiatr`,
  };
}

export default async function Home() {
  const allHaikus = await db
    .selectFrom("haiku")
    .orderBy("createdAt desc")
    .selectAll()
    .execute();

  const { user } = await validateRequest();

  return (
    <main className="font-serif py-8 px-6 md:px-0">
      <header className="mx-auto max-w-prose">
        <h1 className="text-2xl font-semibold w-full flex justify-between items-center">
          <span className="block">All of my haikus 俳句</span>
          {!user && (
            <Link href="/login/github">
              <FaGithub className="text-neutral-500" />
            </Link>
          )}
          {user && (
            <form className="block h-fit" action={logout}>
              <button
                type="submit"
                className="text-neutral-500 text-base font-sans hover:underline"
              >
                Logout
              </button>
            </form>
          )}
        </h1>
        <h2 className="text-neutral-500">
          (me :{" "}
          <Link
            className="hocus:text-rose-400"
            href="https://github.com/MaciejWiatr"
            target="_blank"
          >
            Maciej Wiatr
          </Link>
          )
        </h2>
      </header>
      <ul className="space-y-6 mt-12 max-w-breakout mx-auto">
        {allHaikus.map((haiku) => (
          <li
            key={haiku.id}
            className={tw("relative overflow-hidden", {
              "rounded-xl": Boolean(haiku.photoUrl),
            })}
          >
            <div
              className={tw(
                "relative p-8 md:p-12 bg-gradient-to-tr from-neutral-800 w-full h-full",
                {
                  "bg-transparent pb-6": !haiku.photoUrl,
                }
              )}
            >
              <blockquote className="italic text-xl leading-relaxed">
                {haiku.firstLine} <br />
                {haiku.secondLine} <br />
                {haiku.thirdLine}
              </blockquote>
              <p className="text-neutral-400 mt-2">
                {displayDate(haiku.createdAt)} · {haiku.location}
              </p>
            </div>
            {haiku.photoUrl && (
              <img
                src={haiku.photoUrl}
                alt=""
                className="absolute bottom-0 -z-20 object-cover object-top w-full h-full opacity-50"
              />
            )}
            {!haiku.photoUrl && (
              <div className="w-32 mr-auto border-b border-b-neutral-700 ml-8 md:ml-12" />
            )}
          </li>
        ))}
      </ul>
      <HaikuDrawer />
    </main>
  );
}
