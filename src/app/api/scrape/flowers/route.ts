import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n/g, " ")
    .replace(/\t/g, "")
    .trim();
}

async function scrapeFlowerPage(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  const pageContent = $("#page_content");

  const icelandicName = cleanText(pageContent.find("h1").text());
  const latinName = cleanText(pageContent.find("h2").text());
  const mainContent = cleanText(
    pageContent.find("font[color='#004000']").text()
  );
  const description = cleanText(pageContent.find("span[lang='DE']").text());

  return {
    icelandicName,
    latinName,
    mainContent,
    description,
    url,
  };
}

async function scrapeAllFlowers() {
  const baseUrl = "http://www.floraislands.is/blom.html";
  const response = await fetch(baseUrl);
  const html = await response.text();
  const $ = cheerio.load(html);

  console.log("Parsing HTML...");

  const flowerLinks = $("#left_col a")
    .map((_, el) => {
      const href = $(el).attr("href");
      if (href && href.endsWith(".html") && !href.includes("/")) {
        return {
          name: $(el).text().trim(),
          url: new URL(href, baseUrl).href,
        };
      }
    })
    .get()
    .filter(Boolean);

  console.log("Number of flower links found:", flowerLinks.length);
  console.log("First few flower links:", flowerLinks.slice(0, 5));

  if (flowerLinks.length === 0) {
    throw new Error("No flower links found on the page");
  }

  const allFlowerData = await Promise.all(
    flowerLinks.map(async (flower) => {
      const flowerData = await scrapeFlowerPage(flower.url);
      return { ...flowerData, name: flower.name };
    })
  );

  return allFlowerData;
}

export async function GET() {
  try {
    const allFlowers = await scrapeAllFlowers();
    return NextResponse.json(allFlowers);
  } catch (error) {
    console.error("Scraping failed:", error);
    return NextResponse.json(
      {
        error: "Failed to scrape website",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
