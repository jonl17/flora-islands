import { PlantData } from "@/app/api/scrape/utils";
import Plants from "@/components/Plants";
import { Suspense } from "react";

interface PlantTypePageProps {
  params: {
    type: string;
  };
}

export default async function PlantTypePage({ params }: PlantTypePageProps) {
  const { type } = params;
  const response = await fetch(`http://localhost:3000/api/scrape/${type}`);
  const plantData = (await response.json()) as
    | PlantData[]
    | { error: string; html: string };

  if ("error" in plantData) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{plantData.error}</p>
        {/* {plantData.html && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">HTML Content:</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              {plantData.html}
            </pre>
          </div>
        )} */}
      </div>
    );
  }

  if (!Array.isArray(plantData) || plantData.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold text-yellow-600 mb-4">
          No Plants Found
        </h2>
        <p className="text-gray-700">No plant data available for this type.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{type} Plants</h1>
      <Suspense fallback={<p>Hleður plöntur...</p>}>
        <Plants plants={plantData} />
      </Suspense>
    </div>
  );
}
