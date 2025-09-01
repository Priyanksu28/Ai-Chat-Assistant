import type { Meta, StoryObj } from '@storybook/react';
import Slider from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Temperature: Story = {
  args: {
    label: 'Temperature',
    value: 0.7,
    min: 0,
    max: 2,
    step: 0.1,
    description: 'Controls randomness. Lower values are more deterministic, higher values more creative.',
  },
};

export const MaxTokens: Story = {
  args: {
    label: 'Max Tokens',
    value: 1000,
    min: 1,
    max: 4000,
    step: 1,
    description: 'Maximum number of tokens to generate in the response.',
  },
};

export const TopP: Story = {
  args: {
    label: 'Top P',
    value: 1.0,
    min: 0,
    max: 1,
    step: 0.01,
    description: 'Controls diversity via nucleus sampling. Lower values focus on most likely tokens.',
  },
};

export const FrequencyPenalty: Story = {
  args: {
    label: 'Frequency Penalty',
    value: 0.0,
    min: -2,
    max: 2,
    step: 0.1,
    description: 'Reduces repetition of common tokens. Positive values increase diversity.',
  },
};

export const NoDescription: Story = {
  args: {
    label: 'Simple Slider',
    value: 50,
    min: 0,
    max: 100,
    step: 1,
  },
};

export const AllSliders: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <Slider
        label="Temperature"
        value={0.7}
        min={0}
        max={2}
        step={0.1}
        onChange={() => {}}
        description="Controls randomness. Lower values are more deterministic, higher values more creative."
      />
      <Slider
        label="Max Tokens"
        value={1000}
        min={1}
        max={4000}
        step={1}
        onChange={() => {}}
        description="Maximum number of tokens to generate in the response."
      />
      <Slider
        label="Top P"
        value={1.0}
        min={0}
        max={1}
        step={0.01}
        onChange={() => {}}
        description="Controls diversity via nucleus sampling. Lower values focus on most likely tokens."
      />
    </div>
  ),
};






