import OpenAI from "openai"; // Import OpenAI
import puppeteer from "puppeteer";

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is stored in .env
});

// API Route Handler
export async function POST(request) {
  try {
    // Parse the user’s question from the request body
    let body;

    try {
      body = await request.json(); // Parse JSON body
    } catch (error) {
      console.error("Failed to parse JSON body:", error);
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
    }

    const question = body?.question;

    if (!question) {
      return new Response(JSON.stringify({ error: "No question provided." }), { status: 400 });
    }

    // Step 1: Scrape content from your website
    const websiteContent = await scrapeWebsite("https://yourwebsite.com");

    // Step 2: Create a prompt for OpenAI
    const prompt = `Use the following website content to answer the question:

    Website Content:
    ${websiteContent}

    Question:
    ${question}`;

    // Step 3: Send the prompt to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use "gpt-4" if available
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const answer = response.choices[0].message.content.trim();

    // Return the AI's response
    return new Response(JSON.stringify({ answer }), { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error.message || error);
    return new Response(
      JSON.stringify({ error: error.message || "Something went wrong." }),
      { status: 500 }
    );
  }
}

// Helper function to scrape website content
async function scrapeWebsite(url) {
  try {
    const browser = await puppeteer.launch({
      headless: "new", // Run in headless mode
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Fix compatibility issues
    });
    const page = await browser.newPage();
    await page.goto(url);

    // Extract all visible text from the page
    const content = await page.evaluate(() => document.body.innerText);

    await browser.close();
    return content;
  } catch (error) {
    console.error("Failed to scrape website:", error.message || error);
    throw new Error("Failed to scrape website content.");
  }
}
