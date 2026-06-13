import { Injectable } from '@angular/core';

export interface Bouquet {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  gradient: string;
  textColor: string;
  description: string;
  details: string[];
  category: 'wedding' | 'ceremony' | 'premium';
  featured: boolean;
}

@Injectable({ providedIn: 'root' })
export class BouquetsService {
  private bouquets: Bouquet[] = [
    {
      id: 1,
      name: 'Eternal Romance',
      subtitle: 'white garden roses & ranunculus',
      price: 285,
      gradient: 'linear-gradient(160deg, #F7F2ED 0%, #EDE0CC 40%, #D9C5A8 100%)',
      textColor: '#5C4A32',
      description: 'A timeless arrangement of white garden roses and ranunculus, interwoven with delicate eucalyptus and the softest pale gypsophila. Each stem is chosen at peak bloom for a bouquet that photographs as beautifully as it feels in your hands.',
      details: ['White garden roses', 'Ranunculus', 'Eucalyptus', 'Gypsophila', 'Seasonal greenery'],
      category: 'wedding',
      featured: true
    },
    {
      id: 2,
      name: 'Blush Reverie',
      subtitle: 'peonies & sweet peas',
      price: 320,
      gradient: 'linear-gradient(160deg, #FAEAEA 0%, #F2C8C0 40%, #D4857A 100%)',
      textColor: '#6B2E28',
      description: 'Soft peonies in the palest blush, layered with sweet peas and garden roses. A cloud-like bouquet for the bride who wants to feel as though she is walking through a dream.',
      details: ['Blush peonies', 'Sweet peas', 'Garden roses', 'Hellebores', 'Trailing ribbon'],
      category: 'wedding',
      featured: true
    },
    {
      id: 3,
      name: 'Garden Secret',
      subtitle: 'wildflowers & foliage',
      price: 245,
      gradient: 'linear-gradient(160deg, #E0EAD8 0%, #C5D9B8 40%, #8DB898 100%)',
      textColor: '#2D4A30',
      description: 'Loosely gathered wildflowers and hand-picked garden stems — a bouquet that tells the story of an enchanted garden discovered at golden hour. Unpredictable. Perfectly imperfect.',
      details: ['Wildflower mix', 'Garden hellebores', 'Clematis', 'Ferns', 'Lamb\'s ear'],
      category: 'ceremony',
      featured: true
    },
    {
      id: 4,
      name: 'Ivory Dreams',
      subtitle: 'garden roses & dahlias',
      price: 365,
      gradient: 'linear-gradient(160deg, #F5F0E0 0%, #EDE0C4 40%, #C4A858 100%)',
      textColor: '#5C4820',
      description: 'Cafe au lait dahlias alongside ivory garden roses create a warm, tonal arrangement with extraordinary depth. For the bride who appreciates quiet luxury.',
      details: ['Cafe au lait dahlias', 'Ivory garden roses', 'Antique lisianthus', 'Scabiosa', 'Dried pampas'],
      category: 'premium',
      featured: false
    },
    {
      id: 5,
      name: 'Wildflower Story',
      subtitle: 'anemones & meadow blooms',
      price: 210,
      gradient: 'linear-gradient(160deg, #EAE4F2 0%, #D0C0E8 40%, #806AB0 100%)',
      textColor: '#3A1F6B',
      description: 'Dramatic black-centered anemones with meadow blooms and delicate spring greens. A bouquet with quiet drama — the kind that photographs in black and white.',
      details: ['Black anemones', 'Muscari', 'Fritillaria', 'Ranunculus', 'Natural ribbon'],
      category: 'ceremony',
      featured: true
    },
    {
      id: 6,
      name: 'Velvet Twilight',
      subtitle: 'deep roses & clematis',
      price: 395,
      gradient: 'linear-gradient(160deg, #2A0E28 0%, #5C2A55 40%, #9B558A 100%)',
      textColor: '#F2C8EC',
      description: 'A rare and striking arrangement of deep burgundy and plum roses with trailing clematis. For the bride who is not afraid of the dark, beautiful hours before dawn.',
      details: ['Burgundy garden roses', 'Plum ranunculus', 'Clematis vine', 'Dusty miller', 'Blackberry stems'],
      category: 'premium',
      featured: false
    }
  ];

  getAll(): Bouquet[] {
    return this.bouquets;
  }

  getFeatured(): Bouquet[] {
    return this.bouquets.filter(b => b.featured);
  }

  getById(id: number): Bouquet | undefined {
    return this.bouquets.find(b => b.id === id);
  }

  getByCategory(category: string): Bouquet[] {
    if (category === 'all') return this.bouquets;
    return this.bouquets.filter(b => b.category === category);
  }
}
