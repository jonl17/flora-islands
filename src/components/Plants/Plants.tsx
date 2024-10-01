"use client";
import React, { useState } from "react";
import PlantCard from "../PlantCard/PlantCard";
import { PlantData } from "@/app/api/scrape/utils";
import PlantModal from "@/components/PlantModal";

interface PlantsProps {
  plants: PlantData[];
}

export default function Plants({ plants }: PlantsProps) {
  const [selectedPlant, setSelectedPlant] = useState<PlantData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (plant: PlantData) => {
    setSelectedPlant(plant);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlant(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {plants.map((plant) => (
          <PlantCard
            key={plant.icelandicName}
            {...plant}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
      <PlantModal
        plant={selectedPlant}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
