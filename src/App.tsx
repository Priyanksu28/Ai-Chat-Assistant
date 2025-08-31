import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AIProvider } from './contexts/AIContext';
import Header from './components/Header';
import ModelSelector from './components/ModelSelector';
import PromptEditor from './components/PromptEditor';
import ParametersPanel from './components/ParametersPanel';
import ChatArea from './components/ChatArea';

function App() {
  return (
    <ThemeProvider>
      <AIProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
          <Header />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Sidebar - Model & Parameters */}
              <div className="lg:col-span-1 space-y-6">
                <div className="card">
                  <ModelSelector />
                </div>
                
                <div className="card">
                  <ParametersPanel />
                </div>
              </div>
              
              {/* Main Content - Prompt Editor & Chat */}
              <div className="lg:col-span-2 space-y-6">
                <div className="card">
                  <PromptEditor />
                </div>
                
                <div className="card h-96">
                  <ChatArea />
                </div>
              </div>
            </div>
          </main>
        </div>
      </AIProvider>
    </ThemeProvider>
  );
}

export default App;
