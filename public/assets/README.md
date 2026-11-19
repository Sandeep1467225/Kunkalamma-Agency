# Aqua artwork

All visible artwork loads locally from `public/assets`. No screenshot crops are used.

- `pond-hero.jpg`: full-size generated pond photograph, used by the website.
- `pond-hero.png`: original generated image retained for future exports.
- `fish.svg`, `prawn.svg`, `floating-feed.svg`, `sinking-feed.svg`, `mash-feed.svg`: original scalable illustrations.
- `agency-mark.svg`, `icons.svg`, `water.svg`: scalable identity, interface and wave artwork.
- `feed-bag.svg`: illustrative packaging, not an official product photograph.

The landing page uses static artwork and the Noto Sans typeface. The reference layout is in `src/reference.sass`; shared larger typography, stable bilingual content slots, and water animation are in `src/readability.sass`, both included by the Angular component stylesheet. There are no swimming fish, animation controls, or gallery sections. Decorative water waves move gently and respect reduced-motion preferences. The existing full-resolution pond image is reused.

Pond image created with the built-in image generation tool. Prompt: "A high resolution wide landscape website hero photograph of an Andhra Pradesh aquaculture fish pond, turquoise blue rippling water, blue paddlewheel aerators splashing, coconut palms, soft blue morning sky, sharp professional natural commercial photography, realistic reflections, no text, logos, UI or borders."

Regenerate the deterministic vector source assets with `python make-assets.py`; the generated artwork is static.


## Realistic transparent animals

- `prawn-cutout.png`: supplied prawn image edited with the built-in image tool. Prompt: "Remove all black background and orange glow; preserve the realistic prawn, fine antennae, legs and tail; use genuinely transparent alpha outside the animal."
- `fish-realistic.png`: created with the built-in image tool. Prompt: "Photorealistic complete left-facing Indian rohu carp, silver blue-grey scales, natural eye and translucent fins, realistic wet sheen, isolated on a genuinely transparent background, no text, shadows or illustration."

Both PNG files have alpha transparency and are used as static, contained images in the feed solution cards. They are raster cutouts, not vector SVGs.

English/Telugu labels are maintained in `src/app/translations.ts`. The top-bar selector remembers the selected language in browser storage. Telugu uses Noto Sans Telugu, with Nirmala UI as a local fallback.


The feed type cards and catalogue headers use the supplied photos: `floating-feed.jpg` (surface pellets), `poly-feed.jpg` (sinking pellets), and `mash-feed.jpg` (powder feed). The header has direct Telugu/English buttons; the blue contact strip has been removed.


## Pond scenes used for Fish Feed and Prawn Feed

`fish-pond-scene.png` is the exact user-supplied Vibrant Fish Pond Aeration Scene image, copied without editing. `prawn-pond-scene.png` is a matching image generated with the built-in image tool. Both are used only in general feed view banners, in the right half of an equal two-column desktop layout. Homepage cards use the original transparent fish and prawn cutouts; specific Floating/Poly/Mash photos are unchanged.

Prawn scene prompt: "Match the supplied fish pond photograph's vibrant blue water, sunny light, coconut palms, two blue paddlewheel aerators and wide photographic composition. Show realistic silver olive freshwater prawns naturally submerged just beneath clear foreground water, with ripples and refraction over their bodies. No prawns flying or floating above the water. No text, logos or collage."
