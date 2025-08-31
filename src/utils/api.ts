const API_BASE_URL = 'http://localhost:3001';

export interface ChatRequest {
  message: string;
  model: string;
  parameters: {
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
  };
}

export interface ChatResponse {
  success: boolean;
  response: string;
  model: string;
  parameters: any;
  timestamp: string;
  error?: string;
}

export const chatAPI = {
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  },

  async getModels() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/models`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch models:', error);
      throw error;
    }
  },

  async getTemplates() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/templates`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch templates:', error);
      throw error;
    }
  },
};



