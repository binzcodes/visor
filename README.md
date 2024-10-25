# Visor

Full-coverage `<head>` gear for your Astro app.

Visor automatically generates the necessary HTML tags for global metadata, including:

<meta> tags for charset, viewport, theme color, and description.
<link> tags for favicon and canonical URL.
<meta> tags for OpenGraph and Twitter tags, including title, description, image, and more.
<meta> tag for the generator (Astro version).

You can customize the values of these tags by passing the appropriate props to the <Head> component.

## Installation

To install Visor, run one of the following commands in your Astro project:

```bash
pnpm install @binz/visor
```

```bash
npm install @binz/visor
```

```bash
yarn add @binz/visor
```

For full PWA support you will need to have Astro experimental assets turned on in your `astro.config.mjs` file:

```diff js
// astro.config.mjs
export default {
  // ...
  experimental: {
    // ...
+   assets: true,
  },
  // ...
};
```

To add 

## Usage

Import the <Head> component from the Visor package and use it in your Astro Layout component:

```jsx
// src/layouts/default.astro
---
import { Head } from '@binz/visor/Head.astro'
import logoSvgSrc from '../../public/Logo.svg';
---
<html lang="en">
  <Head
    author={{{
      name: "Joe Bloggs",
      twitterHandle: "@joe_blogs"
    }}}
    canonicalURL="https://example.com"
    description="Built with visor"
    defaultKeywords={[]}
    siteName="Example Site"
    siteFaviconSvg={logoSvgSrc}
    socialImagePath="/social.jpg"
    title="Example Site"
  />
  <body>
    <!-- Your content here -->
  </body>
</html>
```

Visor simplifies dynamic favicon generation with a pre-configured `favicon.ico` file. 

```ts
// pages/favicon.ico
import type { APIRoute } from "astro";
import Favicon from "../lib/favicon";
import path from "node:path";

const faviconSrc = path.resolve("src/images/Logo.svg");

export const GET: APIRoute = Favicon({ faviconSrc });
```

Visor can also be used to generate a `manifest.json` file for PWA support using Astro’s [Static File Endpoints feature](https://docs.astro.build/en/core-concepts/endpoints/). 

Add the `pwa` prop to the <Head> component in your Astro layout:

```jsx
// src/layouts/default.astro
<Head
  title="Example Site" 
  {'...'} 
  pwa
/>
```

Then create a new API route to generate the `manifest.json` file:

```ts
// pages/manifest.json.ts
import type {APIRoute} from "astro";
import Manifest from "../src/lib/manifest";

import favicon from "../images/Logo.svg";

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

```

## Example

A more detailed example of how to use `Visor` in an Astro layout is shown below:

```jsx
// src/layouts/default.astro
---
import { Head } from '@binz/visor/Head.astro'
import logoSvgSrc from '../../public/Logo.svg';

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
  socialImagePath: socialImage = '/social.jpg',
  socialImageAltText = pageTitle,
  keywords,
} = Astro.props;

const canonicalUrl = Astro.url; // requires `site` in astro.config.mjs
const { hostname, pathname } = canonicalUrl;

const DEFAULT_KEYWORDS = [
  SITE_NAME,
  hostname,
  ...
];

const title = `${pageTitle} | ${SITE_NAME}`;
---
<html lang="en">
  <Head
    author={{{
      name: "Joe Bloggs",
      twitterHandle: "@joe_blogs"
    }}}
    canonicalURL={canonicalUrl}
    description={description}
    defaultKeywords={DEFAULT_KEYWORDS}
    keywords={keywords}
    siteName="Example Site"
    siteFaviconSvg={logoSvgSrc}
    siteLocale="en_US"
    siteTwitterHandle="@example_dot_com"
    socialImagePath={socialImage}
    socialImageAltText={socialImageAltText}
    siteThemeColour={SITE_THEME_COLOUR}
    title={title}
    pwa
  >
    <!-- Add custom head tags -->
    <link rel="stylesheet" href="/styles/global.css" />
  </Head>
  <body>
    <!-- Your content here -->
  </body>
</html>
```

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License
This Astro Head component is open source and available under the MIT License.

## Credits
Visor builds on [Favicon Generation with Astro](https://kremalicious.com/favicon-generation-with-astro/) by [Matthias Kretschmann](https://matthiaskretschmann.com/)