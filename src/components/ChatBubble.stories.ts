import type { Meta, StoryObj } from '@storybook/react';
import ChatBubble from './ChatBubble';
import { ChatMessage } from '../../types';

const meta: Meta<typeof ChatBubble> = {
  title: 'Components/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockUserMessage: ChatMessage = {
  id: '1',
  role: 'user',
  content: 'Hello! Can you help me with a coding question?',
  timestamp: new Date().toISOString(),
};

const mockAIMessage: ChatMessage = {
  id: '2',
  role: 'assistant',
  content: 'Of course! I\'d be happy to help you with your coding question. What would you like to know?',
  timestamp: new Date().toISOString(),
  model: 'gpt-4',
  parameters: {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1.0,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
  },
};

const mockLongMessage: ChatMessage = {
  id: '3',
  role: 'assistant',
  content: `Here's a detailed explanation of the concept you asked about:

1. **First Point**: This is the first important thing to understand. It forms the foundation of the concept.

2. **Second Point**: Building on the first point, this adds more complexity and depth to your understanding.

3. **Third Point**: This ties everything together and shows how the different parts work in harmony.

4. **Fourth Point**: Finally, this gives you practical applications and real-world examples.

The key is to understand how these points interconnect and support each other.`,
  timestamp: new Date().toISOString(),
  model: 'gpt-4',
  parameters: {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1.0,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
  },
};

const mockCodeMessage: ChatMessage = {
  id: '4',
  role: 'assistant',
  content: `Here's the solution to your problem:

\`\`\`javascript
function solveProblem(input) {
  // First, we validate the input
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input provided');
  }
  
  // Then we process it step by step
  const processed = input
    .toLowerCase()
    .split('')
    .filter(char => char.match(/[a-z]/))
    .join('');
    
  // Finally, we return the result
  return processed;
}

// Example usage
console.log(solveProblem('Hello World!')); // "helloworld"
\`\`\`

This solution handles edge cases and is optimized for performance.`,
  timestamp: new Date().toISOString(),
  model: 'gpt-4',
  parameters: {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1.0,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
  },
};

export const UserMessage: Story = {
  args: {
    message: mockUserMessage,
    className: 'ml-auto max-w-2xl',
  },
};

export const AIMessage: Story = {
  args: {
    message: mockAIMessage,
    className: 'mr-auto max-w-2xl',
  },
};

export const LongMessage: Story = {
  args: {
    message: mockLongMessage,
    className: 'mr-auto max-w-2xl',
  },
};

export const CodeMessage: Story = {
  args: {
    message: mockCodeMessage,
    className: 'mr-auto max-w-2xl',
  },
};

export const Conversation: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-4xl">
      <ChatBubble
        message={mockUserMessage}
        className="ml-auto max-w-2xl"
      />
      <ChatBubble
        message={mockAIMessage}
        className="mr-auto max-w-2xl"
      />
      <ChatBubble
        message={mockLongMessage}
        className="mr-auto max-w-2xl"
      />
      <ChatBubble
        message={mockCodeMessage}
        className="mr-auto max-w-2xl"
      />
    </div>
  ),
};

export const WithParameters: Story = {
  args: {
    message: {
      ...mockAIMessage,
      parameters: {
        temperature: 0.9,
        maxTokens: 2000,
        topP: 0.8,
        frequencyPenalty: 0.5,
        presencePenalty: 0.3,
      },
    },
    className: 'mr-auto max-w-2xl',
  },
};




