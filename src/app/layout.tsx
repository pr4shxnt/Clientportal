import type { Metadata } from "next";
import "./globals.css";
import Provider from '@/app/StoreProvider'

export const metadata: Metadata = {
  title: "Client Portal | Prashant Adhikari",
  description: "Client Portal serves as the portal of client's ease for Prashant Adhikari, MERN/MENN stack developer from Nepal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
        cz-shortcut-listen="true"
      >
      <Provider>{children}</Provider>
      </body>
    </html>
  );
}
