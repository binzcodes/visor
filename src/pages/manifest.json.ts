import type {APIRoute} from "astro";
import path from "node:path";
import Manifest from "../lib/manifest";

const faviconSrc = path.resolve("./public/Logo.svg");
const faviconPngSizes = [192, 512];

export const GET: APIRoute = Manifest({faviconSrc, faviconPngSizes});
