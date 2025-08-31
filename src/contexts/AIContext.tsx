import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { AIModel, ModelParameters, ChatSession, PromptTemplate } from '../types';

interface AIContextType {
  models: AIModel[];
  currentModel: string;
  setCurrentModel: (modelId: string) => void;
  parameters: ModelParameters;
  setParameters: (params: Partial<ModelParameters>) => void;
  chatHistory: ChatSession[];
  addChatSession: (session: ChatSession) => void;
  updateChatSession: (sessionId: string, updates: Partial<ChatSession>) => void;
  templates: PromptTemplate[];
  addTemplate: (template: PromptTemplate) => void;
  deleteTemplate: (templateId: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

const defaultParameters: ModelParameters = {
  temperature: 0.7,
  maxTokens: 1000,
  topP: 1.0,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0,
};

const mockModels: AIModel[] = [
  {
    id: 'gemini-flash',
    name: 'Gemini Flash',
    description: 'Fast and efficient, great for quick responses (Recommended)',
    maxTokens: 16384,
    temperature: 0.7,
    provider: 'Google',
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Most capable Gemini model, excellent for complex tasks',
    maxTokens: 32768,
    temperature: 0.7,
    provider: 'Google',
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'OpenAI model (requires API key)',
    maxTokens: 4096,
    temperature: 0.7,
    provider: 'OpenAI',
    disabled: true,
  },
  {
    id: 'gpt-4',
    name: 'GPT-4 (Premium)',
    description: 'Most capable GPT model (Premium access required)',
    maxTokens: 8192,
    temperature: 0.7,
    provider: 'OpenAI',
    disabled: true,
  },
];

const mockTemplates: PromptTemplate[] = [
  {
    id: '1',
    name: 'Code Review',
    content: 'Please review this code and provide feedback on:\n1. Code quality\n2. Potential bugs\n3. Performance improvements\n4. Best practices\n\nCode:\n{code}',
    category: 'Development',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Creative Writing',
    content: 'Write a creative story about {topic} with the following elements:\n- Engaging characters\n- Interesting plot twists\n- Vivid descriptions\n- Emotional depth',
    category: 'Creative',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Data Analysis',
    content: 'Analyze this data and provide insights:\n1. Key trends\n2. Anomalies\n3. Recommendations\n4. Visualizations to consider\n\nData:\n{data}',
    category: 'Analysis',
    createdAt: new Date().toISOString(),
  },
];

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

interface AIProviderProps {
  children: ReactNode;
}

export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  const [models] = useState<AIModel[]>(mockModels);
  const [currentModel, setCurrentModel] = useState<string>('gemini-flash'); // Use flash model as default
  const [parameters, setParametersState] = useState<ModelParameters>(defaultParameters);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [templates, setTemplates] = useState<PromptTemplate[]>(mockTemplates);
  const [isLoading, setIsLoading] = useState(false);

  // Load chat history from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aiui-chat-history');
      if (saved) {
        try {
          setChatHistory(JSON.parse(saved));
        } catch {
          // Keep empty array if parsing fails
        }
      }
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aiui-chat-history', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  const setParameters = (updates: Partial<ModelParameters>) => {
    setParametersState(prev => ({ ...prev, ...updates }));
  };

  const addChatSession = (session: ChatSession) => {
    setChatHistory(prev => [session, ...prev]);
  };

  const updateChatSession = (sessionId: string, updates: Partial<ChatSession>) => {
    setChatHistory(prev => 
      prev.map(session => 
        session.id === sessionId ? { ...session, ...updates } : session
      )
    );
  };

  const addTemplate = (template: PromptTemplate) => {
    setTemplates(prev => [template, ...prev]);
  };

  const deleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  return (
    <AIContext.Provider value={{
      models,
      currentModel,
      setCurrentModel,
      parameters,
      setParameters,
      chatHistory,
      addChatSession,
      updateChatSession,
      templates,
      addTemplate,
      deleteTemplate,
      isLoading,
      setIsLoading,
    }}>
      {children}
    </AIContext.Provider>
  );
};

