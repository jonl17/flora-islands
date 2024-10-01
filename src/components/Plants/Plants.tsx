import { PlantData } from "@/app/api/scrape/utils";
import PlantCard from "@/components/PlantCard";
import React from "react";

type Props = {
  plants: PlantData[];
};

export default function Plants({ plants }: Props) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {plants.map((plant, key) => (
        <PlantCard key={key} {...plant} />
      ))}
    </section>
  );
}
