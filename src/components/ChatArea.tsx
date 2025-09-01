import React, { useState, useRef, useEffect } from 'react';
import { useAI } from '../contexts/AIContext';
import ChatBubble from './ChatBubble';
import Button from './Button';
import { chatAPI } from '../utils/api';
import type { ChatMessage, ChatSession } from '../types';

const ChatArea: React.FC = () => {
  const { addChatSession, updateChatSession, isLoading, setIsLoading, currentModel, parameters } = useAI();
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const startNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      model: currentModel,
      parameters: parameters,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setCurrentSession(newSession);
    addChatSession(newSession);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !currentSession) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    // Add user message
    const updatedMessages = [...currentSession.messages, userMessage];
    const updatedSession = {
      ...currentSession,
      messages: updatedMessages,
      updatedAt: new Date().toISOString(),
    };

    setCurrentSession(updatedSession);
    updateChatSession(currentSession.id, updatedSession);
    setInputMessage('');

    // Make real AI API call
    setIsLoading(true);
    
    try {
      const data = await chatAPI.sendMessage({
        message: inputMessage,
        model: currentSession.model,
        parameters: currentSession.parameters,
      });
      
      if (data.success) {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
          content: data.response,
        timestamp: new Date().toISOString(),
        model: currentSession.model,
        parameters: currentSession.parameters,
      };

      const finalMessages = [...updatedMessages, aiMessage];
      const finalSession = {
        ...updatedSession,
        messages: finalMessages,
        updatedAt: new Date().toISOString(),
      };

      setCurrentSession(finalSession);
      updateChatSession(currentSession.id, finalSession);
      } else {
        // Handle error response
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Sorry, I encountered an error: ${data.error || 'Unknown error'}. Please try again.`,
          timestamp: new Date().toISOString(),
          model: currentSession.model,
          parameters: currentSession.parameters,
        };

        const finalMessages = [...updatedMessages, errorMessage];
        const finalSession = {
          ...updatedSession,
          messages: finalMessages,
          updatedAt: new Date().toISOString(),
        };

        setCurrentSession(finalSession);
        updateChatSession(currentSession.id, finalSession);
      }
    } catch (error) {
      console.error('Error calling AI API:', error);
      
      // Handle network or other errors
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered a network error. Please check your connection and try again.',
        timestamp: new Date().toISOString(),
        model: currentSession.model,
        parameters: currentSession.parameters,
      };

      const finalMessages = [...updatedMessages, errorMessage];
      const finalSession = {
        ...updatedSession,
        messages: finalMessages,
        updatedAt: new Date().toISOString(),
      };

      setCurrentSession(finalSession);
      updateChatSession(currentSession.id, finalSession);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!currentSession) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Start a New Conversation
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Begin chatting with AI models using your custom prompts and parameters.
        </p>
        <Button onClick={startNewChat} size="lg">
          Start New Chat
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {currentSession.title}
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={startNewChat}
        >
          New Chat
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentSession.messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          currentSession.messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message}
              className={message.role === 'user' ? 'ml-auto max-w-2xl' : 'mr-auto max-w-2xl'}
            />
          ))
        )}
        
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500"></div>
            <span>AI is thinking...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-dark-700">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 input-field resize-none"
            rows={2}
            disabled={isLoading}
            aria-label="Message input"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="self-end"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
