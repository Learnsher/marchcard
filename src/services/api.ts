import type { ApiResponse, StartResponse, RevealResponse, RedeemResponse } from '../types';

const API_BASE = import.meta.env.DEV ? '/api' : '/marchcard/api';

export const apiService = {
  async start(): Promise<ApiResponse<StartResponse>> {
    try {
      const response = await fetch(`${API_BASE}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to start',
      };
    }
  },

  async reveal(cardId: string): Promise<ApiResponse<RevealResponse>> {
    try {
      const response = await fetch(`${API_BASE}/reveal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId }),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to reveal',
      };
    }
  },

  async redeem(cardId: string): Promise<ApiResponse<RedeemResponse>> {
    try {
      const response = await fetch(`${API_BASE}/redeem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId }),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to redeem',
      };
    }
  },
};
