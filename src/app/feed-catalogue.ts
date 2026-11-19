export interface FeedProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
  feedType: string;
  suitableFor: ('Fish' | 'Prawn')[];
  protein: string | null;
  fat: string | null;
  fibre: string | null;
  packSize: string | null;
  grade: string | null;
  details: string;
}

// Add or edit products here. null means the supplied packaging does not state a value.
// Keep printed grade codes separate from confirmed nutritional specifications.
export const FEED_CATALOGUE: { company: { name: string; image: string }; products: FeedProduct[] } = {
  company: { name: 'Prime', image: 'prime-company.jpeg' },
  products: [
    {
      id: 'prime-floating-28-4',
      name: 'Prime Floating Fish Feed',
      brand: 'Prime',
      image: 'prime-floating-feed.jpg',
      feedType: 'Floating Feed',
      suitableFor: ['Fish'],
      protein: null,
      fat: null,
      fibre: null,
      packSize: null,
      grade: '28/4',
      details: 'Floating fish feed. The bag shows grade 28/4. Contact our team to confirm the protein, fat, available sizes and packing.'
    },
    {
      id: 'polyprime-polyculture',
      name: 'PolyPrime Polyculture Feed',
      brand: 'PolyPrime',
      image: 'polyprime-feed.jpg',
      feedType: 'Poly Feed',
      suitableFor: ['Fish', 'Prawn'],
      protein: 'Min. 32%',
      fat: 'Min. 4%',
      fibre: 'Max. 8%',
      packSize: '25 kg',
      grade: null,
      details: 'Polyculture feed for fish and shrimp. The pack lists minimum 32% protein, minimum 4% fat and maximum 8% fibre. Net weight: 25 kg.'
    },
    {
      id: 'prime-mash',
      name: 'Prime Mash Feed',
      brand: 'Prime',
      image: 'prime-mash-feed.jpg',
      feedType: 'Mash Feed',
      suitableFor: ['Fish'],
      protein: null,
      fat: null,
      fibre: null,
      packSize: '50 kg',
      grade: null,
      details: 'Prime Fish & Mash Feed, Sybarite Prime. Net weight: 50 kg. Contact our team for the complete nutritional specification and feeding guidance.'
    }
  ]
};
