import React from 'react';
import { useAI } from '../contexts/AIContext';
import Slider from './Slider';

const ParametersPanel: React.FC = () => {
  const { parameters, setParameters } = useAI();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Model Parameters
      </h3>
      
      <div className="space-y-4">
        <Slider
          label="Temperature"
          value={parameters.temperature}
          min={0}
          max={2}
          step={0.1}
          onChange={(value) => setParameters({ temperature: value })}
          description="Controls randomness. Lower values are more deterministic, higher values more creative."
        />
        
        <Slider
          label="Max Tokens"
          value={parameters.maxTokens}
          min={1}
          max={4000}
          step={1}
          onChange={(value) => setParameters({ maxTokens: value })}
          description="Maximum number of tokens to generate in the response."
        />
        
        <Slider
          label="Top P"
          value={parameters.topP}
          min={0}
          max={1}
          step={0.01}
          onChange={(value) => setParameters({ topP: value })}
          description="Controls diversity via nucleus sampling. Lower values focus on most likely tokens."
        />
        
        <Slider
          label="Frequency Penalty"
          value={parameters.frequencyPenalty}
          min={-2}
          max={2}
          step={0.1}
          onChange={(value) => setParameters({ frequencyPenalty: value })}
          description="Reduces repetition of common tokens. Positive values increase diversity."
        />
        
        <Slider
          label="Presence Penalty"
          value={parameters.presencePenalty}
          min={-2}
          max={2}
          step={0.1}
          onChange={(value) => setParameters({ presencePenalty: value })}
          description="Reduces repetition of topics. Positive values encourage new topics."
        />
      </div>
      
      <div className="pt-4 border-t border-gray-200 dark:border-dark-700">
        <button
          onClick={() => setParameters({
            temperature: 0.7,
            maxTokens: 1000,
            topP: 1.0,
            frequencyPenalty: 0.0,
            presencePenalty: 0.0,
          })}
          className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default ParametersPanel;





