import {
  Roboto as FontSans,
  Geist_Mono as FontMono,
  Noto_Sans_Arabic as FontNotoSansArabic,
  Noto_Sans_Hebrew as FontNotoSansHebrew,
  Inter,
} from "next/font/google"
import localFont from "next/font/local"

import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
})

const fontBenton = localFont({
  src: [
    {
      path: "../public/fonts/BentonSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/BentonSans-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/BentonSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-heading",
})

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
})

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const fontNotoSansArabic = FontNotoSansArabic({
  subsets: ["latin"],
  variable: "--font-ar",
})

const fontNotoSansHebrew = FontNotoSansHebrew({
  subsets: ["latin"],
  variable: "--font-he",
})

export const fontVariables = cn(
  fontSans.variable,
  fontBenton.variable,
  fontMono.variable,
  fontInter.variable,
  fontNotoSansArabic.variable,
  fontNotoSansHebrew.variable
)
