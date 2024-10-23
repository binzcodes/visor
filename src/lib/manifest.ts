import type {APIRoute, UnresolvedImageTransform} from "astro";
import {getImage} from "astro:assets";

const faviconPngSizes = [192, 512];

interface Manifest {
  name: string;
  description: string;
  start_url?: string;
  display?: string;
  theme_color?: string;
  background_color?: string;
  id?: string;
  icons?: Array<{src: string; type: string; sizes: string}>;
}

export interface ManifestConfig extends Omit<Manifest, "icons"> {
  favicon: Omit<UnresolvedImageTransform, "width" | "height"> & {
    faviconSizes?: number[];
  };
}

type ManifestRoute = (manifestConfig: ManifestConfig) => APIRoute;

export const buildManifest: ManifestRoute =
  ({
    name,
    description,
    start_url = "/",
    display = "standalone",
    theme_color = "#000000",
    background_color = "#ffffff",
    id = name.replace(/[\s.]/g, "-").toLowerCase(),
    favicon: {src, faviconSizes = faviconPngSizes, ...faviconOptions},
  }): APIRoute =>
  async () => {
    const icons = await Promise.all(
      faviconSizes.map(async size => {
        const image = await getImage({
          src,
          width: size,
          height: size,
          ...faviconOptions,
        });
        return {
          src: image.src,
          type: `image/${image.options.format}`,
          sizes: `${image.options.width}x${image.options.height}`,
        };
      })
    );

    const manifest: Manifest = {
      name,
      description,
      start_url,
      display,
      theme_color,
      background_color,
      id,
      icons,
    };

    return new Response(JSON.stringify(manifest));
  };

export default buildManifest;