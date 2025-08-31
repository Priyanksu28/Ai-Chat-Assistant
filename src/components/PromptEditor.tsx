import React, { useState } from 'react';
import { useAI } from '../contexts/AIContext';
import Button from './Button';
import Modal from './Modal';
import type { PromptTemplate } from '../types';

const PromptEditor: React.FC = () => {
  const { templates, addTemplate, deleteTemplate } = useAI();
  const [prompt, setPrompt] = useState('');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Partial<PromptTemplate>>({
    name: '',
    content: '',
    category: 'General',
  });

  const handleTemplateSelect = (template: PromptTemplate) => {
    setPrompt(template.content);
  };

  const handleSaveTemplate = () => {
    if (newTemplate.name && newTemplate.content) {
      const template: PromptTemplate = {
        id: Date.now().toString(),
        name: newTemplate.name,
        content: newTemplate.content,
        category: newTemplate.category || 'General',
        createdAt: new Date().toISOString(),
      };
      addTemplate(template);
      setShowTemplateModal(false);
      setNewTemplate({ name: '', content: '', category: 'General' });
    }
  };

  const handleSaveCurrentAsTemplate = () => {
    if (prompt.trim()) {
      setNewTemplate({
        name: `Template ${templates.length + 1}`,
        content: prompt,
        category: 'General',
      });
      setShowTemplateModal(true);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Prompt Editor
        </h3>
        
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowTemplateModal(true)}
          >
            New Template
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveCurrentAsTemplate}
            disabled={!prompt.trim()}
          >
            Save as Template
          </Button>
        </div>
      </div>
      
      {/* Template Selector */}
      <div className="flex flex-wrap gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleTemplateSelect(template)}
            className="px-3 py-1 text-xs bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-200"
            title={template.content}
          >
            {template.name}
          </button>
        ))}
      </div>
      
      {/* Prompt Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Your Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="input-field min-h-[120px] resize-y"
          aria-label="Prompt input"
        />
      </div>
      
      {/* Template Modal */}
      <Modal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        title="Save Template"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Template Name
            </label>
            <input
              type="text"
              value={newTemplate.name}
              onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
              className="input-field"
              placeholder="Enter template name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Category
            </label>
            <select
              value={newTemplate.category}
              onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
              className="input-field"
            >
              <option value="General">General</option>
              <option value="Development">Development</option>
              <option value="Creative">Creative</option>
              <option value="Analysis">Analysis</option>
              <option value="Writing">Writing</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Content
            </label>
            <textarea
              value={newTemplate.content}
              onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
              className="input-field min-h-[100px] resize-y"
              placeholder="Enter template content"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="secondary"
              onClick={() => setShowTemplateModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveTemplate}
              disabled={!newTemplate.name || !newTemplate.content}
            >
              Save Template
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PromptEditor;
