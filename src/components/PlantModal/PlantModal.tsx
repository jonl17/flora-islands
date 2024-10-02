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
      <DialogContent className="sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] w-full max-h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="text-xl font-bold text-center">
            {plant.latinName}
          </DialogTitle>
        </DialogHeader>
        <div className="h-full overflow-y-auto">
          <div className="p-4 pt-2 space-y-4">
            <div className="relative aspect-video w-full max-w-md mx-auto">
              <Image
                src={plant.imageUrl || "/placeholder.jpg"}
                alt={plant.icelandicName}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <ScrollArea className="h-[40vh] pr-4 text-center">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{plant.icelandicName}</h3>
                <div
                  className="leading-relaxed text-gray-700 space-y-3"
                  dangerouslySetInnerHTML={{ __html: plant.mainContent }}
                />
                <p className="text-sm text-gray-700">{plant.description}</p>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
