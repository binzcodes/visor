import path from "node:path";
import type {APIRoute} from "astro";
import Favicon from "@binz/visor/favicon";

const faviconSrc = path.resolve("src/images/Logo.svg");

export const GET: APIRoute = Favicon({faviconSrc});
