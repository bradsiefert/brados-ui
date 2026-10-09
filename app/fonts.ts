import localFont from "next/font/local"
import { Fira_Code, Source_Sans_3 } from "next/font/google"

export const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

export const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  preload: false,
})

/** Faces shipped by coss.com (`@coss/ui/fonts`). Loaded for the COSS preset. */
export const calSans = localFont({
  display: "swap",
  src: [
    { path: "./coss-fonts/CalSansVF.woff2", style: "normal", weight: "400 700" },
    { path: "./coss-fonts/CalSansVF-Italic.woff2", style: "italic", weight: "400 700" },
  ],
  variable: "--font-coss-sans",
  preload: false,
})

export const paperMono = localFont({
  display: "swap",
  src: "./coss-fonts/PaperMono-Regular.woff2",
  variable: "--font-coss-mono",
  preload: false,
})
