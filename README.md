# Visor

Full-coverage `<head>` gear for your Astro app.

Visor automatically generates the necessary head tags for global metadata.

### Features

- Perfect Lighthouse scores out of the box
- Full PWA support
- Dynamic favicon generation
- Customizable metadata tags
- OpenGraph and social media tags

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
  >
    <!-- Additional head tags -->
  </Visor>
  <body>
    <!-- Your content here -->
  </body>
</html>
```

See the core package [README](./packages/visor/README.md) for advanced usage including:

- [PWA support](./packages/visor/README.md#pwa-support)
- [Dynamic favicon generation](./packages/visor/README.md#site-favicon-generation)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request to the GitHub repository.

This repository uses [Changesets](./.changeset/README.md) to manage releases.

## License

This Astro Head component is open source and available under the MIT License.

## Credits

Visor builds on [Favicon Generation with Astro](https://kremalicious.com/favicon-generation-with-astro/) by [Matthias Kretschmann](https://matthiaskretschmann.com/)
