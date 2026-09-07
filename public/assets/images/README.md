# Image placeholders

Every image on the site currently points at a local file under this
folder that doesn't exist yet — components detect that automatically
and render a bright yellow "add your image here" placeholder box
instead of a broken image, so it's obvious during development exactly
which files still need real photos.

Drop files in using the exact paths referenced in the data files below
and the placeholders will disappear on their own — no code changes
needed.

## Hero carousel — `src/lib/data/hero-slides.js`
- `hero/lifting-hero.jpg`
- `hero/staircase-hero.jpg`
- `hero/rehab-hero.jpg`

## Products — `src/lib/data/products.js`
For each of `aeris-lift`, `duostep`, `stairfit`:
- `products/<slug>-hero.jpg` — product detail page hero banner
- `products/<slug>-thumb.jpg` — card thumbnail (grid, homepage)
- `products/<slug>-model.jpg` — technical specification model photo
- `products/<slug>-gallery-1.jpg` through `-gallery-4.jpg` — gallery grid

DuoStep additionally has one model photo per step count, which swaps
automatically when a visitor selects a different model on the product
page:
- `products/duostep-2-step-model.jpg`
- `products/duostep-3-step-model.jpg`
- `products/duostep-4-step-model.jpg`
- `products/duostep-5-step-model.jpg`
- `products/duostep-6-step-model.jpg`

## Case studies — `src/lib/data/cases.js`
- `cases/<case-slug>.jpg` for each of the 5 case studies

## News — `src/lib/data/news.js`
- `news/<article-slug>.jpg` for each of the 6 articles

Recommended: at least 1200px wide for hero/model images, 800px for
thumbnails/gallery images, consistent aspect ratios within each
category.
