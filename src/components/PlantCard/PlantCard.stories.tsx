import type { Meta, StoryObj } from "@storybook/react";
import PlantCard from "./PlantCard";

const meta: Meta<typeof PlantCard> = {
  component: PlantCard,
  title: "Components/PlantCard",
};

export default meta;

type Story = StoryObj<typeof PlantCard>;

export const Default: Story = {
  args: {},
};
