# Notes

## Mysig Book And Image Resizing

- Added the Mysig Book as the canonical static-site guide under `book/`.
- Added Sharp to Node dev dependencies because image resizing should be implemented by a Node runner rather than a Gleam image codec.
- `npm install --save-dev sharp` reports `2 high severity vulnerabilities` in the Node dev dependency tree. Do not run `npm audit fix` blindly; inspect whether the finding is in build-only tooling and whether fixes change Rollup or transitive package behavior.

## Future Work

- Implement `mysig/image` with typed metadata and resize requests matching `book/image-resizing.md`.
- Add a Sharp FFI runner that writes fingerprinted resized images through the existing asset manifest path.
- Add a gallery example proving Zola `resize_image(path, width=900, height=900, op='fit')` parity.
- Measure image pipeline value by comparing original versus resized page weight, Largest Contentful Paint, and route-by-route parity for the `../me/personal` gallery.
