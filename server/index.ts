import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'your-actual-gemini-api-key-here';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'your-openai-api-key-here';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/api/models', (_req, res) => {
  res.json([
    { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', description: 'Most capable Gemini model' },
    { id: 'gemini-flash', name: 'Gemini Flash', provider: 'Google', description: 'Fast and efficient' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', disabled: true },
    { id: 'gpt-4', name: 'GPT-4 (Premium)', provider: 'OpenAI', disabled: true },
  ]);
});

app.get('/api/templates', (_req, res) => {
  res.json([
    { id: '1', name: 'Code Review', content: 'Review code...' },
    { id: '2', name: 'Creative Writing', content: 'Write a story about {topic}' },
  ]);
});

// AI Chat endpoint using Gemini API
app.post('/api/chat', async (req, res) => {
  try {
    const { message, model, parameters } = req.body;
    
    console.log('Received chat request:', { message, model, parameters });
    
    // Use Gemini API for AI responses
    // Map frontend model names to actual Gemini model names
    let geminiModelName = 'gemini-1.5-flash'; // default
    if (model === 'gemini-pro') {
      geminiModelName = 'gemini-1.5-pro';
    } else if (model === 'gemini-flash') {
      geminiModelName = 'gemini-1.5-flash';
    }
    
    const geminiModel = genAI.getGenerativeModel({ 
      model: geminiModelName,
      generationConfig: {
        temperature: parameters.temperature || 0.7,
        topP: parameters.topP || 1.0,
        maxOutputTokens: parameters.maxTokens || 1000,
      }
    });

    const result = await geminiModel.generateContent([
      'You are a helpful AI assistant. Provide clear, accurate, and helpful responses. When giving code examples, make sure they are complete and working. When explaining concepts, be thorough but easy to understand.',
      message
    ]);

    const aiResponse = result.response.text();
    
    res.json({
      success: true,
      response: aiResponse,
      model,
      parameters,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    
    let errorMessage = 'I\'m experiencing a technical issue right now.';
    
    // Check for specific Gemini API errors
    if (error.status === 429) {
      errorMessage = 'I\'ve reached my daily request limit. Please try again tomorrow or wait a few hours for the quota to reset.';
    } else if (error.message && error.message.includes('quota')) {
      errorMessage = 'I\'ve exceeded my API quota. Please try again later.';
    }
    
    const fallbackResponse = `${errorMessage}\n\nI\'d still like to help you with "${req.body.message}".\n\nHere are some suggestions:\n• Try again in a few hours\n• Ask a simpler question\n• Check back tomorrow\n\nI\'m here to help with programming, general knowledge, writing, analysis, and many other topics. What would you like to know?`;
    
    res.json({
      success: true,
      response: fallbackResponse,
      model: req.body.model,
      parameters: req.body.parameters,
      timestamp: new Date().toISOString()
    });
  }
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
  console.log(`Using Gemini API for AI responses`);
  if (GEMINI_API_KEY === 'your-actual-gemini-api-key-here') {
    console.log('⚠️  WARNING: Please set your GEMINI_API_KEY environment variable');
  }
});

