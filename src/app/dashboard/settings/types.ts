// types.ts
export interface TSetting {
  id: number;
  description: string;
  phone: string;
  address: string;
  email: string;
  openingHours: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string | null;
  enableReservation: boolean;
  showReviews: boolean;
  createAt: string;
  updatedAt: string;
}

export interface TUpdateSettingData {
  description: string;
  phone: string;
  address: string;
  email: string;
  openingHours: string;
  facebookUrl?: string | null; // Optional or null
  instagramUrl?: string | null; // Optional or null
  twitterUrl?: string | null; // Optional or null
  enableReservation: boolean;
  showReviews: boolean;
}

export interface TSettingResponse {
  message: string;
  setting: TSetting;
}
