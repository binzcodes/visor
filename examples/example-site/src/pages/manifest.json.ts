import type {APIRoute} from "astro";
import Manifest from "@binz/visor/manifest";

import favicon from "./../images/Logo.svg";

const faviconPngSizes = [192, 384, 512, 1024];

export const GET: APIRoute = Manifest({
  name: "Example Site",
  background_color: "#FFFFFF",
  description: "An example site",
  display: "standalone",
  favicon: {
    src: favicon,
    faviconSizes: faviconPngSizes,
  },
  id: "example-com",
  short_name: "Example",
  start_url: "/",
  theme_color: "#B9FF66",
});
