import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlantData } from "@/app/api/scrape/utils";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PlantModalProps {
  plant: PlantData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PlantModal({
  plant,
  isOpen,
  onClose,
}: PlantModalProps) {
  if (!plant) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] w-full h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold">
            {plant.latinName}
          </DialogTitle>
        </DialogHeader>
        <div className="h-full overflow-y-auto md:overflow-y-hidden">
          <div className="p-6 pt-2 md:grid md:grid-cols-2 md:gap-6 md:h-full">
            <div className="space-y-6 md:space-y-4">
              <div className="relative aspect-video md:aspect-square w-full">
                <Image
                  src={
                    plant.imageUrl?.replace("_small", "") ||
                    plant.imageUrl ||
                    "/placeholder.jpg"
                  }
                  alt={plant.icelandicName}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            </div>
            <div className="mt-6 md:mt-0 md:h-full">
              <ScrollArea className="h-full pr-4 md:pb-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">
                    {plant.icelandicName}
                  </h3>
                  <div
                    className="text-base leading-relaxed text-gray-700 space-y-4"
                    dangerouslySetInnerHTML={{ __html: plant.mainContent }}
                  />

                  <p className="text-base text-gray-700 md:pr-4">
                    {plant.description}
                  </p>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
