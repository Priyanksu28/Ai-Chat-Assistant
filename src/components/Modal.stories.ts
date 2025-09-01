import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    showCloseButton: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = ({ children, ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <ModalWrapper {...args} title="Default Modal">
      <p>This is a default modal with some content.</p>
      <p>You can put any content here.</p>
    </ModalWrapper>
  ),
};

export const Small: Story = {
  render: (args) => (
    <ModalWrapper {...args} title="Small Modal" size="sm">
      <p>This is a small modal.</p>
    </ModalWrapper>
  ),
};

export const Large: Story = {
  render: (args) => (
    <ModalWrapper {...args} title="Large Modal" size="lg">
      <div className="space-y-4">
        <p>This is a large modal with more content.</p>
        <p>It can accommodate more complex layouts and longer content.</p>
        <div className="bg-gray-100 dark:bg-dark-700 p-4 rounded">
          <p>You can even include formatted content like this.</p>
        </div>
      </div>
    </ModalWrapper>
  ),
};

export const ExtraLarge: Story = {
  render: (args) => (
    <ModalWrapper {...args} title="Extra Large Modal" size="xl">
      <div className="space-y-4">
        <p>This is an extra large modal.</p>
        <p>Perfect for complex forms or detailed content.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-dark-700 p-4 rounded">
            <h4 className="font-semibold mb-2">Left Column</h4>
            <p>Some content here</p>
          </div>
          <div className="bg-gray-100 dark:bg-dark-700 p-4 rounded">
            <h4 className="font-semibold mb-2">Right Column</h4>
            <p>More content here</p>
          </div>
        </div>
      </div>
    </ModalWrapper>
  ),
};

export const NoCloseButton: Story = {
  render: (args) => (
    <ModalWrapper {...args} title="Modal Without Close Button" showCloseButton={false}>
      <p>This modal doesn't have a close button in the header.</p>
      <p>Users can still close it by pressing Escape or clicking outside.</p>
      <div className="mt-4">
        <Button onClick={() => {}}>Custom Close Action</Button>
      </div>
    </ModalWrapper>
  ),
};

export const WithForm: Story = {
  render: (args) => (
    <ModalWrapper {...args} title="Form Modal" size="lg">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            rows={3}
            placeholder="Enter your message"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary">Cancel</Button>
          <Button>Submit</Button>
        </div>
      </form>
    </ModalWrapper>
  ),
};






