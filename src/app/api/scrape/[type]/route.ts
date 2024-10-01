import { NextResponse } from "next/server";
import { scrapeAllItems } from "../utils";

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  const { type } = params;
  const url = `http://www.floraislands.is/${type}.html`;

  console.log(`Attempting to scrape type: ${type}`);
  console.log(`URL: ${url}`);

  try {
    const result = await scrapeAllItems(url);
    if ("html" in result) {
      // This means no item links were found
      return NextResponse.json(result, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Scraping failed:", error);
    return NextResponse.json(
      {
        error: "Failed to scrape website",
        details: error instanceof Error ? error.message : String(error),
        type,
        url,
      },
      { status: 500 }
    );
  }
}
