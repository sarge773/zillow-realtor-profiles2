# Zillow Realtor Profiles Scraper

An Apify Actor that scrapes real estate agent profile information from Zillow, including name, email, phone number, and real estate agency.

## Features

- 🏠 Scrapes agent profiles from Zillow
- 📧 Extracts: Name, Email, Phone, Agency, Profile URL
- 🚀 Fast scraping with CheerioCrawler
- 🔄 Automatic proxy rotation to avoid blocking
- 📊 Structured JSON output

## Input Parameters

- **Start URLs**: Zillow agent review pages to scrape
- **Max Requests per Crawl**: Maximum number of pages to visit (default: 100)
- **Max Agents**: Maximum number of agent profiles to scrape (default: 50)

## Output Data

Each scraped agent profile contains:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "(555) 123-4567",
  "agency": "ABC Realty",
  "profileUrl": "https://www.zillow.com/profile/..."
}
```

## Local Development

### Prerequisites

- Node.js 20 or higher
- Apify CLI (installation instructions below)

### Setup

1. Install dependencies:
```bash
npm install
```

2. Run locally:
```bash
apify run
```

## Deployment to Apify Platform

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed step-by-step instructions.

## Customization

### Modifying Scraped Fields

Edit `src/main.js` to add or modify the data extraction logic.

### Updating CSS Selectors

If Zillow changes their HTML structure, update the selectors in `src/main.js`:

```javascript
const name = $('h1').first().text().trim();
const email = $('a[href^="mailto:"]').attr('href').replace('mailto:', '');
// ... etc
```

## Important Notes

⚠️ **Legal Compliance**: Ensure your use of this Actor complies with Zillow's Terms of Service and robots.txt.

⚠️ **Rate Limiting**: Start with small limits to test. The Actor includes proxy rotation but excessive requests may still result in blocks.

⚠️ **Data Accuracy**: Zillow's page structure may change. The Actor includes fallback strategies for data extraction but may require updates.

## Support

For issues or questions:
- Check the Apify documentation: https://docs.apify.com
- Apify Discord community: https://discord.gg/apify

## License

ISC
