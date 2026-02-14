
import { Service, Testimonial, Product } from './types';

export const SERVICES: Service[] = [
  {
    id: 'car-decor',
    title: 'Grand Wedding Car Decor',
    description: 'Bespoke designs using imported premium roses and exotic lilies. We make your departure as majestic as your arrival.',
    priceStart: 'Rs. 12,000',
    image: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'stage-decor',
    title: 'Royal Stage Setups',
    description: 'Transforming spaces into floral paradises. Customized themes for Nikah, Barat, and Walima ceremonies.',
    priceStart: 'Rs. 65,000',
    image: 'https://images.unsplash.com/photo-1519225495810-751783d9a7a8?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'bridal-bouquet',
    title: 'Signature Bouquets',
    description: 'Hand-picked, long-stemmed luxury blooms crafted by our master florists for the discerning bride.',
    priceStart: 'Rs. 5,500',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'gajray',
    title: 'Floral Jewelry',
    description: 'Delicate, fragrant jewelry pieces that celebrate tradition. Perfect for Mehndi and Mayun festivities.',
    priceStart: 'Rs. 3,500',
    image: 'https://images.unsplash.com/photo-1594950195709-a14f66c24b2b?auto=format&fit=crop&q=80&w=1200'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Eternal Crimson Box',
    description: 'Deep velvet roses in a premium signature keepsake box.',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800',
    category: 'bouquet'
  },
  {
    id: 'p2',
    name: 'Pearl Lily Serenity',
    description: 'Virgin white lilies paired with seasonal eucalyptus greenery.',
    price: 6800,
    image: 'https://images.unsplash.com/photo-1525310238806-e0b75350b551?auto=format&fit=crop&q=80&w=800',
    category: 'bouquet'
  },
  {
    id: 'p3',
    name: 'Golden Hour Glow',
    description: 'Vibrant marigolds and sunflowers for traditional celebrations.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800',
    category: 'bouquet'
  },
  {
    id: 'p4',
    name: 'Royal Orchid Tall',
    description: 'Rare purple dendrobiums in a tall handcrafted ceramic vase.',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1520188129767-e17551936130?auto=format&fit=crop&q=80&w=800',
    category: 'gift'
  }
];

export const CAROUSEL_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=90&w=1600',
    caption: 'Majestic Car Decoration'
  },
  {
    url: 'https://images.unsplash.com/photo-1519225495810-751783d9a7a8?auto=format&fit=crop&q=90&w=1600',
    caption: 'Grand Stage Florals'
  },
  {
    url: 'https://images.unsplash.com/photo-1520188129767-e17551936130?auto=format&fit=crop&q=90&w=1600',
    caption: 'Exotic Gift Arrangements'
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Freshness Guaranteed',
    description: 'Sourced daily from the finest farms across Pakistan.',
    icon: '🌸'
  },
  {
    title: 'Artistic Excellence',
    description: 'Designs by internationally trained master florists.',
    icon: '✨'
  },
  {
    title: 'Express Delivery',
    description: 'On-time delivery for all your precious moments.',
    icon: '🚚'
  },
  {
    title: 'Custom Creations',
    description: 'We bring your unique floral visions to life.',
    icon: '💎'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sara Khan',
    text: 'Breathtaking car decoration. The flowers were fresh and stayed beautiful throughout the event.',
    serviceType: 'Car Decoration',
    rating: 5
  },
  {
    id: '2',
    name: 'Ahmed Malik',
    text: 'A truly royal experience. Their stage design transformed our venue into a dreamland.',
    serviceType: 'Stage Setup',
    rating: 5
  },
  {
    id: '3',
    name: 'Zoya Ali',
    text: 'Simplest booking process and the most elegant bouquets in Lahore. Highly recommended!',
    serviceType: 'Luxury Gifting',
    rating: 5
  }
];
