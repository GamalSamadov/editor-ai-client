import Providers from "@/providers/providers"
import "./globals.css"

export const metadata = {
  title: "JanobMuharrir",
  description:
    "JanobMuharrir - Sun'iy intillekt orqali o'zbekcha matnlarni tahrir qiladigan suniy intellekt dasturi",

  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/icon/icon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/icon/icon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/icon/icon-180x180.png",
    },
  ],

  startupImage: [
    //
    // ──────────────────────────────────────────────────────────────
    // iPhone 5 / 5S / SE (1st gen) - Portrait & Landscape
    // 640x1136 (Portrait) -> 320x568 pts @2x
    // 1136x640 (Landscape) -> 568x320 pts @2x
    // ──────────────────────────────────────────────────────────────
    {
      url: "/apple-splash-640x1136.png",
      media:
        "(device-width: 320px) and (device-height: 568px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    },
    {
      url: "/apple-splash-1136x640.png",
      media:
        "(device-width: 568px) and (device-height: 320px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    },

    //
    // ──────────────────────────────────────────────────────────────
    // iPhone 6 / 7 / 8 / SE (2nd/3rd gen) - Portrait & Landscape
    // 750x1334 (Portrait) -> 375x667 pts @2x
    // 1334x750 (Landscape) -> 667x375 pts @2x
    // ──────────────────────────────────────────────────────────────
    {
      url: "/apple-splash-750x1334.png",
      media:
        "(device-width: 375px) and (device-height: 667px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    },
    {
      url: "/apple-splash-1334x750.png",
      media:
        "(device-width: 667px) and (device-height: 375px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    },

    //
    // ──────────────────────────────────────────────────────────────
    // iPhone 6 / 7 / 8 Plus - Portrait & Landscape
    // 1242x2208 (Portrait) -> 414x736 pts @3x
    // 2208x1242 (Landscape) -> 736x414 pts @3x
    // ──────────────────────────────────────────────────────────────
    {
      url: "/apple-splash-1242x2208.png",
      media:
        "(device-width: 414px) and (device-height: 736px) " +
        "and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    },
    {
      url: "/apple-splash-2208x1242.png",
      media:
        "(device-width: 736px) and (device-height: 414px) " +
        "and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    },

    //
    // ──────────────────────────────────────────────────────────────
    // iPhone X / XS / 11 Pro / 12 Mini / 13 Mini - P & L
    // 1125x2436 (Portrait) -> 375x812 pts @3x
    // 2436x1125 (Landscape) -> 812x375 pts @3x
    // ──────────────────────────────────────────────────────────────
    {
      url: "/apple-splash-1125x2436.png",
      media:
        "(device-width: 375px) and (device-height: 812px) " +
        "and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    },
    {
      url: "/apple-splash-2436x1125.png",
      media:
        "(device-width: 812px) and (device-height: 375px) " +
        "and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    },

    //
    // ──────────────────────────────────────────────────────────────
    // iPhone XR / 11 - P & L
    // 828x1792 (Portrait) -> 414x896 pts @2x
    // 1792x828 (Landscape) -> 896x414 pts @2x
    // ──────────────────────────────────────────────────────────────
    {
      url: "/apple-splash-828x1792.png",
      media:
        "(device-width: 414px) and (device-height: 896px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    },
    {
      url: "/apple-splash-1792x828.png",
      media:
        "(device-width: 896px) and (device-height: 414px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    },

    //
    // ──────────────────────────────────────────────────────────────
    // iPhone XS Max / 11 Pro Max - P & L
    // 1242x2688 (Portrait) -> 414x896 pts @3x
    // 2688x1242 (Landscape) -> 896x414 pts @3x
    // ──────────────────────────────────────────────────────────────
    {
      url: "/apple-splash-1242x2688.png",
      media:
        "(device-width: 414px) and (device-height: 896px) " +
        "and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    },
    {
      url: "/apple-splash-2688x1242.png",
      media:
        "(device-width: 896px) and (device-height: 414px) " +
        "and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    },

    //
    // ──────────────────────────────────────────────────────────────
    // iPhone 12 / 12 Pro / 13 / 14 - P & L
    // 1170x2532 (Portrait) -> 390x844 pts @3x
    // 2532x1170 (Landscape) -> 844x390 pts @3x
    // ──────────────────────────────────────────────────────────────
    {
      url: "/apple-splash-1170x2532.png",
      media:
        "(device-width: 390px) and (device-height: 844px) " +
        "and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    },
    {
      url: "/apple-splash-2532x1170.png",
      media:
        "(device-width: 844px) and (device-height: 390px) " +
        "and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    },

    //
    // ──────────────────────────────────────────────────────────────
    // iPhone 12/13/14 Pro Max, 14 Plus (Common) - P & L
    // 1284x2778 (Portrait) -> 428x926 pts @3x
    // 2778x1284 (Landscape) -> 926x428 pts @3x
    // ──────────────────────────────────────────────────────────────
    {
      url: "/apple-splash-1284x2778.png",
      media:
        "(device-width: 428px) and (device-height: 926px) " +
        "and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    },
    {
      url: "/apple-splash-2778x1284.png",
      media:
        "(device-width: 926px) and (device-height: 428px) " +
        "and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    },

    //
    // ──────────────────────────────────────────────────────────────
    // iPhone 14 Pro Max (Newest) - P & L
    // 1290x2796 (Portrait) -> 430x932 pts @3x
    // 2796x1290 (Landscape) -> 932x430 pts @3x
    // ──────────────────────────────────────────────────────────────
    {
      url: "/apple-splash-1290x2796.png",
      media:
        "(device-width: 430px) and (device-height: 932px) " +
        "and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    },
    {
      url: "/apple-splash-2796x1290.png",
      media:
        "(device-width: 932px) and (device-height: 430px) " +
        "and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    },

    //
    // ──────────────────────────────────────────────────────────────
    // (Possibly) iPhone 15 / Future - P & L
    // 1320x2868 (Portrait) -> 440x956 pts @3x (approx.)
    // 2868x1320 (Landscape) -> 956x440 pts @3x
    // Adjust as needed for new device specs.
    // ──────────────────────────────────────────────────────────────
    {
      url: "/apple-splash-1320x2868.png",
      media:
        "(device-width: 440px) and (device-height: 956px) " +
        "and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    },
    {
      url: "/apple-splash-2868x1320.png",
      media:
        "(device-width: 956px) and (device-height: 440px) " +
        "and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    },

    //
    // ──────────────────────────────────────────────────────────────
    // iPad 9.7" (Regular iPad) - P & L
    // 1536x2048 (Portrait) -> 768x1024 pts @2x
    // 2048x1536 (Landscape) -> 1024x768 pts @2x
    // ──────────────────────────────────────────────────────────────
    {
      url: "/apple-splash-1536x2048.png",
      media:
        "(device-width: 768px) and (device-height: 1024px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    },
    {
      url: "/apple-splash-2048x1536.png",
      media:
        "(device-width: 1024px) and (device-height: 768px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    },

    //
    // ──────────────────────────────────────────────────────────────
    // iPad 10.2" / iPad 7th/8th/9th Gen - P & L
    // 1620x2160 (Portrait) -> 810x1080 pts @2x
    // 2160x1620 (Landscape) -> 1080x810 pts @2x
    // ──────────────────────────────────────────────────────────────
    {
      url: "/apple-splash-1620x2160.png",
      media:
        "(device-width: 810px) and (device-height: 1080px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    },
    {
      url: "/apple-splash-2160x1620.png",
      media:
        "(device-width: 1080px) and (device-height: 810px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    },

    //
    // ──────────────────────────────────────────────────────────────
    // iPad Air 4 / 5 (10.9") - P & L
    // 1640x2360 (Portrait) -> 820x1180 pts @2x
    // 2360x1640 (Landscape) -> 1180x820 pts @2x
    // ──────────────────────────────────────────────────────────────
    {
      url: "/apple-splash-1640x2360.png",
      media:
        "(device-width: 820px) and (device-height: 1180px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    },
    {
      url: "/apple-splash-2360x1640.png",
      media:
        "(device-width: 1180px) and (device-height: 820px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    },

    //
    // ──────────────────────────────────────────────────────────────
    // iPad Pro 10.5" - P & L
    // 1668x2224 (Portrait) -> 834x1112 pts @2x
    // 2224x1668 (Landscape) -> 1112x834 pts @2x
    // ──────────────────────────────────────────────────────────────
    {
      url: "/apple-splash-1668x2224.png",
      media:
        "(device-width: 834px) and (device-height: 1112px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    },
    {
      url: "/apple-splash-2224x1668.png",
      media:
        "(device-width: 1112px) and (device-height: 834px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    },

    //
    // ──────────────────────────────────────────────────────────────
    // iPad Pro 11" - P & L
    // 1668x2388 (Portrait) -> 834x1194 pts @2x
    // 2388x1668 (Landscape) -> 1194x834 pts @2x
    // ──────────────────────────────────────────────────────────────
    {
      url: "/apple-splash-1668x2388.png",
      media:
        "(device-width: 834px) and (device-height: 1194px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    },
    {
      url: "/apple-splash-2388x1668.png",
      media:
        "(device-width: 1194px) and (device-height: 834px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    },

    //
    // ──────────────────────────────────────────────────────────────
    // iPad Pro 12.9" - P & L
    // 2048x2732 (Portrait) -> 1024x1366 pts @2x
    // 2732x2048 (Landscape) -> 1366x1024 pts @2x
    // ──────────────────────────────────────────────────────────────
    {
      url: "/apple-splash-2048x2732.png",
      media:
        "(device-width: 1024px) and (device-height: 1366px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    },
    {
      url: "/apple-splash-2732x2048.png",
      media:
        "(device-width: 1366px) and (device-height: 1024px) " +
        "and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
