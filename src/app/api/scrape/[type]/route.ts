import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import fetch from "node-fetch";

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

  // Find the image URL
  let imageUrl = null;
  const imgSrc = $("img").attr("src");
  if (imgSrc) {
    imageUrl = new URL(imgSrc, url).href;
  }

  return {
    icelandicName,
    latinName,
    mainContent,
    description,
    url,
    imageUrl,
  };
}

async function scrapeAllItems(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  console.log("Parsing HTML...");

  // Try to find links in the left column first
  let itemLinks = $("#left_col a")
    .map((_, el) => {
      const href = $(el).attr("href");
      if (
        href &&
        (href.endsWith(".html") || href.includes("/")) &&
        !href.startsWith("http") &&
        !href.startsWith("#") &&
        !href.includes("Annad/") &&
        !href.includes("Ritgerdir/") &&
        !href.includes("index.html") &&
        !href.includes("blom.html") &&
        !href.includes("burknar.html") &&
        !href.includes("mosar.html") &&
        !href.includes("flettur.html") &&
        !href.includes("sveppir.html") &&
        !href.includes("latina-1.html")
      ) {
        return {
          name: $(el).text().trim(),
          url: new URL(href, url).href,
        };
      }
    })
    .get()
    .filter(Boolean);

  // If no links found in left column, try to find them in the main content
  if (itemLinks.length === 0) {
    itemLinks = $("#page_content a")
      .map((_, el) => {
        const href = $(el).attr("href");
        if (
          href &&
          (href.endsWith(".html") || href.includes("/")) &&
          !href.startsWith("http") &&
          !href.startsWith("#") &&
          !href.includes("Annad/") &&
          !href.includes("Ritgerdir/") &&
          !href.includes("index.html") &&
          !href.includes("blom.html") &&
          !href.includes("burknar.html") &&
          !href.includes("mosar.html") &&
          !href.includes("flettur.html") &&
          !href.includes("sveppir.html") &&
          !href.includes("latina-1.html")
        ) {
          return {
            name: $(el).text().trim(),
            url: new URL(href, url).href,
          };
        }
      })
      .get()
      .filter(Boolean);
  }

  // Remove duplicates
  itemLinks = itemLinks.filter(
    (link, index, self) => index === self.findIndex((t) => t.url === link.url)
  );

  console.log("Number of item links found:", itemLinks.length);
  console.log("First few item links:", itemLinks.slice(0, 5));

  if (itemLinks.length === 0) {
    console.log("No item links found, returning HTML for debugging");
    return { html, error: "No item links found on the page" };
  }

  const allItemData = await Promise.all(
    itemLinks.map(async (item) => {
      let itemData;
      try {
        itemData = await scrapeFlowerPage(item.url);
      } catch (error) {
        console.log(error);
        console.log(`Failed to scrape ${item.url}`);
        itemData = { error: `Failed to scrape ${item.url}` };
      }
      return { ...itemData, name: item.name };
    })
  );

  return allItemData;
}

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
