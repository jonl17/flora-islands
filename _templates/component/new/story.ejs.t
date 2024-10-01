---
to: src/components/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.stories.tsx
---
import type { Meta, StoryObj } from '@storybook/react';
import <%= h.changeCase.pascal(name) %> from './<%= h.changeCase.pascal(name) %>';

const meta: Meta<typeof <%= h.changeCase.pascal(name) %>> = {
  component: <%= h.changeCase.pascal(name) %>,
  title: 'Components/<%= h.changeCase.pascal(name) %>',
};

export default meta;

type Story = StoryObj<typeof <%= h.changeCase.pascal(name) %>>;

export const Default: Story = {
  args: {},
};