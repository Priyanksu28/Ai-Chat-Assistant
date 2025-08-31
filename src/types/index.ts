export interface AIModel {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
  temperature: number;
  provider: string;
  disabled?: boolean;
}

export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  model?: string;
  parameters?: ModelParameters;
}

export interface ModelParameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  model: string;
  parameters: ModelParameters;
  createdAt: string;
  updatedAt: string;
}

export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
}

export interface AppState {
  theme: Theme;
  currentModel: string;
  currentParameters: ModelParameters;
  chatHistory: ChatSession[];
  templates: PromptTemplate[];
}

