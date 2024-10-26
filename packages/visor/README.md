# Visor

Full-coverage `<head>` gear for your Astro app.

Visor automatically generates the necessary HTML tags for global metadata, including:

- `<meta>` tags for charset, viewport, theme color, and description.
- `<link>` tags for favicon and canonical URL.
- `<meta>` tags for OpenGraph and Twitter tags, including title, description, image, and more.
- `<meta>` tag for the generator (Astro version).

You can customize the values of these tags by passing the appropriate props to the <Head> component.

## Installation

To install Visor, run one of the following commands in your Astro project:

```bash
pnpm install @binz/visor sharp sharp-ico
```

```bash
npm install @binz/visor sharp sharp-ico
```

```bash
yarn add @binz/visor sharp sharp-ico
```

Currently, Visor requires the `sharp` and `sharp-ico` packages to be installed in your project.

## Usage

Import the <Head> component from the Visor package and use it in your Astro Layout component:

```astro
// src/layouts/default.astro
---
import {Visor} from '@binz/visor';
import logoSvgSrc from '../images/Logo.svg';

interface Props {
  title: string;
}

const { title: pageTitle } = Astro.props;
const canonicalUrl = Astro.url;
---
<!doctype html>
<html lang="en">
  <Visor
    author={{
      name: "Joe Bloggs",
      twitterHandle: "@joe_blogs"
    }}
    canonicalURL={canonicalUrl}
    description="Built with visor"
    defaultKeywords={[]}
    siteName="Example Site"
    siteFaviconSvg={logoSvgSrc}
    socialImagePath="/social.png"
    title="Example Site"
  />
  <body>
    <!-- Your content here -->
  </body>
</html>
```

### Site Favicon Generation

Visor simplifies dynamic favicon generation with a pre-configured `favicon.ico` file.

Create a new API route at `pages/favicon.ico` to generate the favicon:

```ts
// pages/favicon.ico
import path from "node:path";
import type {APIRoute} from "astro";
import Favicon from "@binz/visor/favicon";

const faviconSrc = path.resolve("src/images/Logo.svg");

export const GET: APIRoute = Favicon({faviconSrc});
```

### PWA Support

Visor also supports Progressive Web App (PWA) features.

In addition to generating the necessary tags for PWA support, Visor can also be used to generate a `manifest.json` file for PWA support using Astro’s [Static File Endpoints feature](https://docs.astro.build/en/core-concepts/endpoints/).

Add the `pwa` prop to the <Head> component in your Astro layout:

```diff lang=astro title="src/layouts/default.astro"
<Head
  title="Example Site"
  {'...'}
+ pwa
/>
```

Finally create a new API route to generate the `manifest.json` file:

```ts
// pages/manifest.json.ts
import type {APIRoute} from "astro";
import Manifest from "@binz/visor/manifest";

import favicon from "./../images/Logo.svg";

const faviconPngSizes = [192, 512];

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
```

## Example

A more detailed example of how to use `Visor` in an Astro layout is shown below:

```astro
// src/layouts/default.astro
---
import {Visor} from '@binz/visor';
import logoSvgSrc from '../images/Logo.svg';

const SITE_NAME = 'Example Site';

interface Props {
  title: string;
  description: string;
  socialImagePath?: string;
  socialImageAltText?: string;
  keywords?: string[];
}

const {
  title: pageTitle,
  description,
  socialImagePath: socialImage = '/social.png',
  socialImageAltText = pageTitle,
  keywords,
} = Astro.props;

const canonicalUrl = Astro.url;

const title = `${pageTitle} | ${SITE_NAME}`;
---
<html lang="en">
  <Visor
    author={{{
      name: "Joe Bloggs",
      twitterHandle: "@joe_blogs"
    }}}
    canonicalURL={canonicalUrl}
    description={description}
    defaultKeywords={[ SITE_NAME, 'example' ]}
    keywords={keywords}
    siteName="Example Site"
    siteFaviconSvg={logoSvgSrc}
    siteLocale="en_US"
    siteTwitterHandle="@example_dot_com"
    socialImagePath={socialImage}
    socialImageAltText={socialImageAltText}
		socialTwitterCardType='summary_large_image'
    siteThemeColour={'#883aea'}
		contentType='website'
    title={title}
    pwa
  >
    <!-- Add custom head tags -->
    <link rel="stylesheet" href="/styles/global.css" />
  </Visor>
  <body>
    <!-- Your content here -->
  </body>
</html>
```

## License

This Astro Head component is open source and available under the MIT License.
