import React from 'react';
import { useAI } from '../contexts/AIContext';

const ModelSelector: React.FC = () => {
  const { models, currentModel, setCurrentModel } = useAI();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        AI Model
      </label>
      
      <select
        value={currentModel}
        onChange={(e) => setCurrentModel(e.target.value)}
        className="input-field"
        aria-label="Select AI model"
      >
        {models.map((model) => (
          <option 
            key={model.id} 
            value={model.id}
            disabled={model.disabled}
          >
            {model.name} - {model.provider}
          </option>
        ))}
      </select>
      
      {models.find(m => m.id === currentModel) && (
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {models.find(m => m.id === currentModel)?.description}
        </div>
      )}
    </div>
  );
};

export default ModelSelector;




