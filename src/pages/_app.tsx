import { type AppType } from "next/dist/shared/lib/utils";

import "@/styles/globals.css";

import { DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";

/**
 * Typography system (tip #1 — match font & brand).
 * Brand: techy + crafted.
 *  - Instrument Serif: sharp, angular modern serif for headlines (the "fancy" side)
 *  - JetBrains Mono: uppercase labels & metadata (the "techy" side)
 *  - DM Sans: geometric, neutral body copy
 */
const sans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Instrument_Serif({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  // Next 14.1 has no fallback-metrics entry for this face; avoid the noisy warning.
  adjustFontFallback: false,
});

const mono = JetBrains_Mono({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} ${sans.className}`}
    >
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
