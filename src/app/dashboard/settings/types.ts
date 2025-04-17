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
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  twitterUrl?: string | null;
  enableReservation: boolean;
  showReviews: boolean;
}

export interface TSettingResponse {
  message: string;
  setting: TSetting;
}
