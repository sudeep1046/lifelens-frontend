import "./globals.css";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "LifeLens AI",
  description: "AI-powered healthcare system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}