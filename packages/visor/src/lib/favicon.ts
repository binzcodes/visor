import type {APIRoute} from "astro";
import sharp from "sharp";
import ico from "sharp-ico";

export interface FaviconOptions {
  faviconSrc: string;
}

type FaviconRoute = (options: FaviconOptions) => APIRoute;

const buildFavicon: FaviconRoute =
  ({faviconSrc}) =>
  async () => {
    // generate 32x32 png
    const buffer32 = await sharp(faviconSrc)
      .resize(32)
      .toFormat("png")
      .toBuffer();

    // generate ico
    const icoBuffer = ico.encode([buffer32]);

    return new Response(icoBuffer, {
      headers: {"Content-Type": "image/x-icon"},
    });
  };

export default buildFavicon;
