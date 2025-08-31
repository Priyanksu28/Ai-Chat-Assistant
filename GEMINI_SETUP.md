# Gemini API Setup Guide

## Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key (it will look like: `AIzaSyC...`)

## Step 2: Update Your .env File

Add this line to your `.env` file:
```
GEMINI_API_KEY=your-actual-gemini-api-key-here
```

Replace `your-actual-gemini-api-key-here` with your real Gemini API key.

## Step 3: Restart the Server

After updating the `.env` file, restart your server:
```bash
npm run server
```

## Benefits of Gemini API

- ✅ **Free Tier Available**: 15 requests per minute, 1000 requests per day
- ✅ **No Credit Card Required**: Unlike OpenAI
- ✅ **Powerful Models**: Gemini Pro and Gemini Flash
- ✅ **Fast Responses**: Optimized for quick interactions
- ✅ **Multimodal**: Can handle text, images, and more

## Model Options

- **Gemini Pro**: Best for complex tasks, longer responses
- **Gemini Flash**: Fast and efficient for quick questions

## Troubleshooting

If you get errors:
1. Make sure your API key is correct
2. Check if you've exceeded the free tier limits
3. Verify the server is running
4. Check the browser console for errors

Your AI chat should now work with Google's Gemini models!
