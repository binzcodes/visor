# Visor

Full-coverage `<head>` gear for Astro apps.

Visor automatically generates the necessary HTML tags for global metadata, including:

<meta> tags for charset, viewport, theme color, and description.
<link> tags for favicon and canonical URL.
<meta> tags for OpenGraph and Twitter tags, including title, description, image, and more.
<meta> tag for the generator (Astro version).

You can customize the values of these tags by passing the appropriate props to the <Head> component.

## Installation

To install Visor, run on of the following commands in your Astro project:

```bash
pnpm install @binz/visor
```

```bash
npm install @binz/visor
```

```bash
yarn add @binz/visor
```

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
  >
    <!-- Add custom head tags here -->
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
Visor builds on [Favicon Generation with Astro](https://kremalicious.com/favicon-generation-with-astro/)  by [Matthias Kretschmann](https://matthiaskretschmann.com/)