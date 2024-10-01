import * as cheerio from "cheerio";
import fetch from "node-fetch";

export interface PlantData {
  icelandicName: string;
  latinName: string;
  mainContent: string;
  description: string;
  url: string;
  imageUrl: string | null;
  name: string;
}

export interface ItemLink {
  name: string;
  url: string;
}

export function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n/g, " ")
    .replace(/\t/g, "")
    .trim();
}

export async function scrapePlantTypePage(url: string): Promise<PlantData> {
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
    name: "", // This will be filled in later
  };
}

export async function scrapeAllItems(
  url: string
): Promise<PlantData[] | { html: string; error: string }> {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  console.log("Parsing HTML...");

  const itemLinks = findItemLinks($, url);

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
        itemData = await scrapePlantTypePage(item.url);
      } catch (error) {
        console.log(error);
        console.log(`Failed to scrape ${item.url}`);
        itemData = { error: `Failed to scrape ${item.url}` };
      }
      return { ...itemData, name: item.name };
    })
  );

  // @ts-expect-error I don't have time for this ts bug
  return allItemData;
}

function findItemLinks($: cheerio.CheerioAPI, baseUrl: string): ItemLink[] {
  const findLinks = (selector: string) =>
    $(selector)
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
            url: new URL(href, baseUrl).href,
          };
        }
      })
      .get()
      .filter(Boolean);

  let itemLinks = findLinks("#left_col a");

  if (itemLinks.length === 0) {
    itemLinks = findLinks("#page_content a");
  }

  return itemLinks.filter(
    (link, index, self) => index === self.findIndex((t) => t.url === link.url)
  );
}
