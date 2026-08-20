import "./globals.css";
import { DM_Sans } from "next/font/google";

export const metadata = {
  title: "Fisheye",
  description: "Collectif de photographes indépendants",
};

const dmsans = DM_Sans({
  variable: "--font-DMSans",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={dmsans.variable}>
      <body>{children}</body>
    </html>
  );
}
