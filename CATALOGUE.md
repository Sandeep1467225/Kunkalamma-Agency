# Feed catalogue

Edit `src/app/feed-catalogue.ts` to add or update products. The single `FEED_CATALOGUE` object owns the company label and the product list; the list, details and enquiries all render from those entries.

Each entry contains `id`, `name`, `brand`, `image` (under `public/assets`), `feedType`, `suitableFor`, `protein`, `fat`, `fibre`, `packSize`, `grade` and `details`. Use null for information that is not confirmed. Add Telugu name/detail translations in `src/app/translations.ts` when adding a new product.

The current three products use supplied packaging photographs. PolyPrime explicitly lists minimum protein 32%, minimum fat 4%, maximum fibre 8% and 25 kg. Mash explicitly lists 50 kg. Floating shows the grade 28/4; its protein/fat values and pack weight are left unconfirmed because those fields are not explicitly labelled in the supplied photo. No other supplier products are displayed.

Navigation follows Company > Feeds > Product details. Homepage feed entries open company selection first. Selecting the company preserves the chosen feed type or prawn filter; back controls return to feeds or companies. Only the configured company is shown.

The company selection card uses `company.image` (the supplied Prime logo) and shows no product-pack previews. Product photos appear after selecting the company.
