import type { Meta, StoryObj } from '@storybook/react';
import Plants from './Plants';

const meta: Meta<typeof Plants> = {
  component: Plants,
  title: 'Components/Plants',
};

export default meta;

type Story = StoryObj<typeof Plants>;

export const Default: Story = {
  args: {},
};