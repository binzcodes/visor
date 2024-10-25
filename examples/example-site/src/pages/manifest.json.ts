import type {APIRoute} from "astro";
import Manifest from "@binz/visor/manifest";

import favicon from "./../images/Logo.svg";

const faviconPngSizes = [192, 512];

export const GET: APIRoute = Manifest({
  name: "Example Site",
  description: "An example site",
  start_url: "/",
  display: "standalone",
  id: "example-com",
  background_color: "#FFFFFF",
  theme_color: "#B9FF66",
  favicon: {
    src: favicon,
    faviconSizes: faviconPngSizes,
  },
});
