import type { Meta, StoryObj } from '@storybook/react';
import PlantModal from './PlantModal';

const meta: Meta<typeof PlantModal> = {
  component: PlantModal,
  title: 'Components/PlantModal',
};

export default meta;

type Story = StoryObj<typeof PlantModal>;

export const Default: Story = {
  args: {},
};