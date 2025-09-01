# AI UI Interface - Comprehensive Documentation

## 📋 Table of Contents
- [Research](#research)
- [Design](#design)
- [Development](#development)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)

## 🔍 Research

### Platforms Reviewed & Chosen Features

#### **AI Model Providers Evaluated:**

1. **OpenAI GPT Models**
   - ✅ **GPT-3.5 Turbo**: Fast, cost-effective, reliable
   - ❌ **GPT-4**: Premium access required, quota limitations
   - **Limitations**: Requires credit card, paid tier after free credits

2. **Google Gemini Models** ⭐ **CHOSEN**
   - ✅ **Gemini Pro**: Most capable, excellent for complex tasks
   - ✅ **Gemini Flash**: Fast and efficient for quick responses
   - ✅ **Free Tier**: 15 requests/minute, 1000 requests/day
   - ✅ **No Credit Card Required**: Accessible to all users

3. **Anthropic Claude**
   - ❌ **Claude 3**: Premium access required
   - **Limitations**: Limited free tier, requires payment setup

#### **Key Features Implemented:**
- **Multi-Model Support**: Switch between Gemini Pro and Flash
- **Real-time Chat**: Live AI responses with streaming
- **Parameter Control**: Temperature, max tokens, top-p, frequency/presence penalties
- **Chat History**: Persistent conversations with localStorage
- **Dark/Light Mode**: Theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🎨 Design

### Design Mockup & Tailwind Mapping

#### **Design Philosophy:**
- **Modern Interface**: Clean, minimalist design inspired by ChatGPT and modern AI tools
- **Accessibility First**: High contrast, readable fonts, keyboard navigation
- **Responsive Layout**: Adapts seamlessly from mobile to desktop

#### **Tailwind CSS Implementation:**

```css
/* Color Scheme */
.bg-gray-50          /* Light mode background */
.dark:bg-dark-900    /* Dark mode background */
.text-gray-900       /* Primary text */
.dark:text-white     /* Dark mode text */

/* Component Styling */
.input-field         /* Custom input styling */
.btn-primary         /* Primary button design */
.chat-bubble        /* Chat message containers */

/* Responsive Breakpoints */
.sm:px-6            /* Small screens and up */
.lg:px-8            /* Large screens and up */
.max-w-7xl          /* Maximum content width */
```

#### **Component Architecture:**
- **Header**: Theme toggle, model selector, navigation
- **ChatArea**: Message input, conversation display, AI responses
- **ParametersPanel**: AI model configuration controls
- **ModelSelector**: Dropdown for choosing AI models
- **ChatBubble**: Individual message display with user/AI distinction

## 🚀 Development

### Implementation Notes & Known Limitations

#### **Technical Stack:**
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v3 + PostCSS
- **AI Integration**: Google Generative AI SDK
- **State Management**: React Context API
- **Build Tool**: Vite with React plugin

#### **Key Implementation Details:**

1. **Theme Management**
   ```typescript
   // ThemeContext.tsx - System preference detection
   const getSystemTheme = (): 'light' | 'dark' => {
     return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
   };
   ```

2. **AI Chat Integration**
   ```typescript
   // Real-time Gemini API integration
   const geminiModel = genAI.getGenerativeModel({ 
     model: 'gemini-1.5-flash',
     generationConfig: { temperature, topP, maxOutputTokens }
   });
   ```

3. **Chat Persistence**
   ```typescript
   // localStorage for chat history
   useEffect(() => {
     localStorage.setItem('aiui-chat-history', JSON.stringify(chatHistory));
   }, [chatHistory]);
   ```

#### **Known Limitations:**

1. **API Quotas**
   - Gemini free tier: 15 requests/minute, 1000 requests/day
   - Quota resets daily at midnight UTC
   - Solution: Upgrade to paid tier or wait for reset

2. **Browser Compatibility**
   - Requires modern browsers with ES2020+ support
   - localStorage required for chat persistence
   - CSS custom properties for theme switching

3. **Model Availability**
   - Some models require premium access
   - API rate limits may vary by region
   - Fallback responses when API fails

#### **Performance Optimizations:**
- **Lazy Loading**: Components load on demand
- **Debounced Input**: Prevents excessive API calls
- **Efficient Re-renders**: React.memo and useCallback usage
- **Optimized Bundles**: Vite tree-shaking and code splitting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: 20.19+ or 22.12+)
- npm package manager
- Google AI Studio account for Gemini API key

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd AiUi

# Install dependencies
npm install

# Set up environment variables
cp env-template.txt .env
# Edit .env and add your GEMINI_API_KEY

# Start development server
npm run dev

# Start backend server (in another terminal)
npm run server
```

### Environment Variables
```env
GEMINI_API_KEY=your-actual-gemini-api-key-here
PORT=3001
```

## 📡 API Documentation

### Backend Endpoints

#### **Health Check**
```http
GET /api/health
Response: { "status": "ok", "time": "2025-08-31T..." }
```

#### **Available Models**
```http
GET /api/models
Response: Array of AI models with capabilities
```

#### **AI Chat**
```http
POST /api/chat
Body: { "message": "string", "model": "string", "parameters": {...} }
Response: { "success": true, "response": "AI response", ... }
```

### Frontend API Integration
```typescript
// src/utils/api.ts
export const chatAPI = {
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    return await response.json();
  }
};
```

## 📁 Project Structure

```
AiUi/
├── src/
│   ├── components/          # React components
│   │   ├── Button.tsx      # Reusable button component
│   │   ├── ChatArea.tsx    # Main chat interface
│   │   ├── Header.tsx      # Navigation and theme toggle
│   │   ├── ModelSelector.tsx # AI model selection
│   │   └── ParametersPanel.tsx # AI parameter controls
│   ├── contexts/           # React Context providers
│   │   ├── AIContext.tsx   # AI state management
│   │   └── ThemeContext.tsx # Theme state management
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── index.css           # Global styles and Tailwind
├── server/                 # Backend Express server
│   └── index.ts           # API endpoints and Gemini integration
├── .storybook/            # Storybook configuration
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## 🎭 Storybook Integration

### Storybook Setup
The project includes a comprehensive Storybook setup for component development and testing:

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

### Available Stories
- **Button.stories.ts**: Button component variations
- **ChatBubble.stories.ts**: Chat message display
- **Header.stories.ts**: Navigation component
- **Modal.stories.ts**: Modal dialog component
- **Slider.stories.ts**: Range input component

### Storybook Features
- **Component Documentation**: Props, usage examples, and variants
- **Interactive Testing**: Live component testing in isolation
- **Responsive Design**: View components at different screen sizes
- **Accessibility**: Built-in accessibility testing tools

## 🎨 Auxiliary Assets

### Images & Icons
- **React Logo**: `src/assets/react.svg`
- **Vite Logo**: `public/vite.svg`
- **Storybook Assets**: `src/stories/assets/` (tutorial images)

### CSS Assets
- **Custom Components**: `src/stories/button.css`, `src/stories/header.css`
- **Global Styles**: `src/index.css` with Tailwind directives
- **Theme Variables**: CSS custom properties for dark/light modes

### Configuration Files
- **Tailwind**: `tailwind.config.js` with custom color schemes
- **PostCSS**: `postcss.config.js` for CSS processing
- **TypeScript**: `tsconfig.json` and `tsconfig.app.json`
- **Vite**: `vite.config.ts` for build optimization

## 🔧 Development Scripts

```json
{
  "scripts": {
    "dev": "vite",                    // Start development server
    "build": "tsc && vite build",     // Build for production
    "server": "tsx server/index.ts",  // Start backend server
    "storybook": "storybook dev -p 6006", // Start Storybook
    "build-storybook": "storybook build"  // Build Storybook
  }
}
```

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend Deployment
```bash
# Set environment variables on your hosting platform
# Deploy server/ folder to Node.js hosting (Vercel, Netlify, etc.)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and Google's Gemini AI**
