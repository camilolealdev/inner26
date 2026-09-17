export interface StudioEvent {
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  dateLabel: string;
  price: number;
  priceLabel: string;
  illustrationName: string;
  coverImageUrl: string;
  bookingSlots: string[];
  status?: 'active' | 'waitlist';
  ctaLabel?: string;
  type: 'event';
}
