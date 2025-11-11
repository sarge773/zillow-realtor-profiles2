// Apify SDK - toolkit for building Apify Actors (Read more at https://docs.apify.com/sdk/js/)
import { Actor } from 'apify';
// Crawlee - web scraping and browser automation library (Read more at https://crawlee.dev)
import { CheerioCrawler, Dataset } from 'crawlee';

// The init() call configures the Actor for its environment. It's recommended to start every Actor with an init()
await Actor.init();

// Structure of input is defined in input_schema.json
const { 
    startUrls = [{ url: 'https://www.zillow.com/professionals/real-estate-agent-reviews/' }], 
    maxRequestsPerCrawl = 100,
    maxAgents = 50
} = (await Actor.getInput()) ?? {};

console.log('Starting Zillow Realtor Profiles Scraper...');
console.log(`Max requests per crawl: ${maxRequestsPerCrawl}`);
console.log(`Max agents to scrape: ${maxAgents}`);

// Counter for scraped agents
let agentsScraped = 0;

// Proxy configuration to rotate IP addresses and prevent blocking (https://docs.apify.com/platform/proxy)
const proxyConfiguration = await Actor.createProxyConfiguration();

const crawler = new CheerioCrawler({
    proxyConfiguration,
    maxRequestsPerCrawl,
    async requestHandler({ enqueueLinks, request, $, log }) {
        const { url, userData } = request;
        log.info(`Processing ${url}`, { userData });

        // If this is an agent listing page, extract agent profile links
        if (!userData?.isAgentProfile) {
            log.info('Extracting agent profile links from listing page');
            
            // Find all agent profile links
            // Zillow agent profiles typically have URLs like /profile/[agent-name]/
            const agentLinks = [];
            $('a[href*="/profile/"]').each((_, el) => {
                const href = $(el).attr('href');
                if (href && href.includes('/profile/')) {
                    // Convert relative URLs to absolute
                    const absoluteUrl = href.startsWith('http') ? href : `https://www.zillow.com${href}`;
                    agentLinks.push(absoluteUrl);
                }
            });

            log.info(`Found ${agentLinks.length} agent profile links`);

            // Enqueue agent profile pages with a marker
            for (const link of agentLinks) {
                if (agentsScraped >= maxAgents) {
                    log.info(`Reached maximum number of agents (${maxAgents}), stopping`);
                    break;
                }
                await crawler.requestQueue.addRequest({
                    url: link,
                    userData: { isAgentProfile: true }
                });
            }

            // Enqueue pagination links
            await enqueueLinks({
                globs: ['https://www.zillow.com/professionals/real-estate-agent-reviews/**'],
                userData: { isAgentProfile: false }
            });

        } else {
            // This is an agent profile page - extract data
            log.info('Extracting agent profile data');

            // Extract agent name
            const name = $('h1').first().text().trim() || 
                        $('[class*="agent-name"]').first().text().trim() ||
                        $('[class*="AgentName"]').first().text().trim() ||
                        'N/A';

            // Extract email - look for email links or text
            let email = 'N/A';
            $('a[href^="mailto:"]').each((_, el) => {
                const href = $(el).attr('href');
                if (href) {
                    email = href.replace('mailto:', '').trim();
                    return false; // break
                }
            });
            
            // Alternative email search in text
            if (email === 'N/A') {
                const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
                const pageText = $('body').text();
                const emailMatch = pageText.match(emailRegex);
                if (emailMatch) {
                    email = emailMatch[0];
                }
            }

            // Extract phone number - look for tel links or phone patterns
            let phone = 'N/A';
            $('a[href^="tel:"]').each((_, el) => {
                const href = $(el).attr('href');
                if (href) {
                    phone = href.replace('tel:', '').trim();
                    return false; // break
                }
            });

            // Alternative phone search
            if (phone === 'N/A') {
                const phoneRegex = /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
                const pageText = $('body').text();
                const phoneMatch = pageText.match(phoneRegex);
                if (phoneMatch) {
                    phone = phoneMatch[0].trim();
                }
            }

            // Extract agency/brokerage name
            const agency = $('[class*="brokerage"]').first().text().trim() ||
                          $('[class*="company"]').first().text().trim() ||
                          $('[class*="office"]').first().text().trim() ||
                          $('[class*="Agency"]').first().text().trim() ||
                          'N/A';

            const agentData = {
                name,
                email,
                phone,
                agency,
                profileUrl: url
            };

            log.info(`Scraped agent: ${name}`, agentData);

            // Save data to Dataset
            await Dataset.pushData(agentData);
            agentsScraped++;

            if (agentsScraped >= maxAgents) {
                log.info(`Reached maximum number of agents (${maxAgents})`);
            }
        }
    },
    
    // Handle errors gracefully
    failedRequestHandler({ request, log }) {
        log.error(`Request ${request.url} failed multiple times`);
    }
});

// Run the crawler
await crawler.run(startUrls);

console.log(`Scraping completed! Total agents scraped: ${agentsScraped}`);

// Gracefully exit the Actor process. It's recommended to quit all Actors with an exit()
await Actor.exit();
