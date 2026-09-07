# Product demo videos

Drop your own MP4 files here using these exact names (referenced in
`src/lib/data/products.js`) and the product pages will pick them up
automatically — no code changes needed:

- `aeris-lift-demo.mp4`
- `duostep-demo.mp4`
- `stairfit-demo.mp4`

Until a file exists, the video player falls back gracefully to the
product's hero image as a poster frame.

Recommended: H.264 MP4, 16:9, under ~15MB for fast loading. For longer
or higher-res footage, consider hosting on a CDN/video service and
swapping the `video` path in `products.js` for a full URL instead.
