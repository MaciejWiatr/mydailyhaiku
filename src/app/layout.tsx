import { Inter, Quattrocento } from "next/font/google";
import "./globals.css";
import { tw } from "@/utils/tw";
import { UserProvider } from "@/providers/UserProvider";
import { validateRequest } from "@/auth/lucia";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const quattrocento = Quattrocento({
  subsets: ["latin-ext"],
  weight: ["400", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();

  return (
    <html lang="en">
      <body
        className={tw(
          inter.className,
          quattrocento.className,
          "bg-neutral-800 text-white"
        )}
      >
        <UserProvider user={user}>{children}</UserProvider>
      </body>
    </html>
  );
}
