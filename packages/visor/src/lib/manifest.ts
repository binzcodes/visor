import type {APIRoute, UnresolvedImageTransform} from "astro";
import {getImage} from "astro:assets";

const iconPngSizes = [192, 384, 512, 1024];

interface Manifest {
  name: string;
  description: string;
  start_url?: string;
  short_name?: string;
  display?: string;
  theme_color?: string;
  background_color?: string;
  id?: string;
  icons?: Array<{src: string; type: string; sizes: string}>;
}

export interface ManifestConfig extends Omit<Manifest, "icons"> {
  icon: Omit<UnresolvedImageTransform, "width" | "height"> & {
    iconSizes?: number[];
  };
}

type ManifestRoute = (manifestConfig: ManifestConfig) => APIRoute;

export const buildManifest: ManifestRoute =
  ({
    name,
    description,
    start_url = "/",
    short_name = name
      .split(" ")
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join("")
      .replace(/[^a-zA-Z0-9]/g, ""),
    display = "standalone",
    theme_color = "#000000",
    background_color = "#ffffff",
    id = name.replace(/[\s.]/g, "-").toLowerCase(),
    icon: {src, iconSizes = iconPngSizes, ...iconOptions},
  }): APIRoute =>
  async () => {
    const icons = await Promise.all(
      iconSizes.map(async size => {
        const image = await getImage({
          src,
          width: size,
          height: size,
          ...iconOptions,
        });
        return {
          src: image.src,
          type: `image/${image.options.format}`,
          sizes: `${image.options.width}x${image.options.height}`,
          purpose: "any",
        };
      })
    );

    const manifest: Manifest = {
      name,
      description,
      start_url,
      short_name,
      display,
      theme_color,
      background_color,
      id,
      icons,
    };

    return new Response(JSON.stringify(manifest));
  };

export default buildManifest;
