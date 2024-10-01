import { PlantData } from "@/app/api/scrape/utils";
import Image from "next/image";
import React from "react";

type Props = PlantData & {
  onCardClick: (plant: PlantData) => void;
};

export default function PlantCard({
  icelandicName,
  latinName,
  description,
  imageUrl,
  mainContent,
  onCardClick,
  ...otherProps
}: Props) {
  const handleClick = () => {
    onCardClick({
      icelandicName,
      latinName,
      description,
      imageUrl,
      mainContent,
      ...otherProps,
    });
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer"
      aria-label="Open modal"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48">
          {imageUrl ? (
            <Image
              height={400}
              width={400}
              src={imageUrl}
              alt={icelandicName}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>
        <div className="p-4 text-black">
          <h2 className="text-xl font-semibold mb-2">{icelandicName}</h2>
          <p className="text-sm text-gray-600 italic mb-2">{latinName}</p>
          <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
        </div>
      </div>
    </div>
  );
}
