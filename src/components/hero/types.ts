
export interface Car {
  name: string;
  tagline: string;
  description: string;
  price: string;
  image: string;
  mobile_image?: string;
  features: string[];
  priority?: number;
  price_available?: boolean;
}

export interface HeroCarouselProps {
  cars?: Car[];
  onTestDrive: (carName: string) => void;
  onPriceQuote: (carName: string) => void;
  onExplore: (carName: string) => void;
}

export interface CarModelMapping {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  priority: number;
}
