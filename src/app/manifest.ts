import { MetadataRoute } from "next"

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: "JanobAI - Videoni matniga bexato o'girish",
    short_name: "JanobAI",
    description:
      "JanobAI - Sun'iy intillekt orqali ishlovchi o'zbekcha youtube platformasidagi videolarni matnga bexato o'giruvchi ajoib madel",
    start_url: "/",
    display: "standalone",
    background_color: "#292929",
    theme_color: "#292929",
    icons: [
      {
        src: "/icon/icon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/icon/icon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icon/icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

export default manifest
