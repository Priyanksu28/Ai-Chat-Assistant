import React, { useState } from 'react';
import type { ChatMessage } from '../types';
import Button from './Button';

interface ChatBubbleProps {
  message: ChatMessage;
  className?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, className = '' }) => {
  const [showActions, setShowActions] = useState(false);
  const isUser = message.role === 'user';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadAsJSON = () => {
    const dataStr = JSON.stringify(message, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `message-${message.id}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div
      className={`group relative ${className}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div
        className={`max-w-4xl mx-auto p-4 rounded-lg ${
          isUser
            ? 'bg-primary-500 text-white ml-auto'
            : 'bg-gray-100 dark:bg-dark-800 text-gray-900 dark:text-white'
        }`}
      >
        <div className="flex items-start space-x-3">
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser
              ? 'bg-primary-600 text-white'
              : 'bg-gray-300 dark:bg-dark-700 text-gray-600 dark:text-gray-300'
          }`}>
            {isUser ? 'U' : 'AI'}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium mb-1">
              {isUser ? 'You' : 'AI Assistant'}
            </div>
            <div className="text-sm whitespace-pre-wrap break-words">
              {message.content}
            </div>
            
            {message.parameters && (
              <div className="mt-2 text-xs opacity-75">
                <span className="font-medium">Parameters:</span> 
                Temp: {message.parameters.temperature}, 
                Tokens: {message.parameters.maxTokens}
              </div>
            )}
            
            <div className="text-xs opacity-75 mt-2">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      {showActions && (
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="!p-1 !min-w-0"
            title="Copy message"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={downloadAsJSON}
            className="!p-1 !min-w-0"
            title="Download as JSON"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
