export interface ScratchCard {
  id: string;
  status: 'idle' | 'scratching' | 'revealed' | 'redeemed' | 'expired';
  prize?: string;
  expiresAt?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface StartResponse {
  cardId: string;
  expiresAt: number;
}

export interface RevealResponse {
  prize: string;
  expiresAt: number;
}

export interface RedeemResponse {
  success: boolean;
  message: string;
}
