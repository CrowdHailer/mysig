# Development, Export, And Deploy

Mysig's development and production model should produce the same artifacts. The difference is when work happens.

## Development

Development can build lazily:

- render the requested route
- build only assets needed by that route
- watch source files and restart quickly
- inject a manifest so client asset lookup matches production

## Static Export

Production export should walk every route eagerly:

- render every HTML page
- copy passthrough files
- build client bundles
- resize all requested image variants
- write fingerprinted assets
- fail on any missing content, asset, or image transform

## Verification

Before deploying, run:

```sh
gleam format --check
gleam test
gleam run
```

For migrations, compare old and new output:

- route paths
- canonical URLs
- static assets
- image dimensions and formats
- generated HTML for critical pages
- mobile and desktop screenshots

## Deployment

The deploy target is the generated `public/` directory. Configure hosting to serve fingerprinted assets with long-lived immutable cache headers and HTML with short cache headers.

Useful feedback measures:

- time from fresh clone to first successful build
- number of routes with output differences during migration
- image weight before and after resizing
- Largest Contentful Paint on pages with hero images
- broken-link count after export
