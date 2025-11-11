# Deployment Guide: Zillow Realtor Profiles Scraper to Apify.com

This guide will walk you through deploying your Actor to the Apify platform.

## Table of Contents
- [Method 1: Deploy Using Apify CLI (Recommended)](#method-1-deploy-using-apify-cli-recommended)
- [Method 2: Deploy via Web Interface](#method-2-deploy-via-web-interface)
- [Method 3: Deploy from GitHub](#method-3-deploy-from-github)

---

## Method 1: Deploy Using Apify CLI (Recommended)

The fastest and easiest way to deploy your Actor.

### Step 1: Install Apify CLI

**macOS/Linux:**
```bash
curl -fsSL https://apify.com/install-cli.sh | bash
```

**Windows (PowerShell):**
```powershell
irm https://apify.com/install-cli.ps1 | iex
```

Verify installation:
```bash
apify --version
```

### Step 2: Login to Apify

```bash
apify login
```

This will:
1. Open your browser
2. Ask you to log in to Apify (create account if needed: https://console.apify.com/sign-up)
3. Generate an API token
4. Save credentials locally

### Step 3: Navigate to Actor Directory

```bash
cd zillow-realtor-profiles
```

### Step 4: Test Locally (Optional but Recommended)

```bash
apify run
```

This will:
- Run the Actor locally
- Save results to `./storage/datasets/default/`
- Help you verify everything works before deploying

### Step 5: Deploy to Apify Platform

```bash
apify push
```

This will:
- Build your Actor
- Upload to Apify platform
- Create a new Actor in your account
- Provide a URL to your Actor

**Example output:**
```
Info: Deploying Actor 'zillow-realtor-profiles' to Apify platform.
Info: Building Docker image...
Info: Pushing to Apify...
Success: Actor was deployed to https://console.apify.com/actors/YOUR_USERNAME~zillow-realtor-profiles
```

### Step 6: Run Your Actor on Apify

1. Click the URL from the output (or go to https://console.apify.com/actors)
2. Click on your Actor "zillow-realtor-profiles"
3. Configure input parameters
4. Click "Start"

**Done!** ✅

---

## Method 2: Deploy via Web Interface

If you prefer not to use CLI, you can upload your Actor manually.

### Step 1: Create Apify Account

1. Go to https://console.apify.com/sign-up
2. Sign up for a free account
3. Verify your email

### Step 2: Create New Actor

1. Go to https://console.apify.com/actors
2. Click **"Create new"** button (top right)
3. Select **"Empty"** template
4. Click **"Create"**

### Step 3: Configure Actor Settings

In the Actor detail page:

1. **Name**: Enter "zillow-realtor-profiles"
2. **Title**: Enter "Zillow Realtor Profiles Scraper"
3. **Description**: Enter "Scrapes real estate agent profiles from Zillow"
4. Click **"Save"**

### Step 4: Upload Actor Files

#### Option A: Upload via Source Code Tab

1. Click on the **"Source"** tab
2. You'll see a file tree on the left
3. Upload each file by:
   - Clicking the "+" icon or "Upload" button
   - Selecting files from your computer
   
**Files to upload:**
```
.actor/
  - actor.json
  - input_schema.json
  - dataset_schema.json
  - output_schema.json
src/
  - main.js
- Dockerfile
- package.json
- README.md
- AGENTS.md
```

4. Make sure the directory structure matches exactly

#### Option B: Use the Web IDE

1. Click on the **"Source"** tab
2. Click **"Switch to Web IDE"**
3. Create folders: `.actor/` and `src/`
4. Copy-paste content from each file:
   - Open a file in your text editor
   - Copy the entire content
   - Create the file in Web IDE
   - Paste the content
   - Save

### Step 5: Build the Actor

1. Click **"Build"** button (top right)
2. Wait for the build to complete (1-3 minutes)
3. Check for any errors in the build log

### Step 6: Test Your Actor

1. Go to the **"Input"** tab
2. The form should show your input fields (Start URLs, Max Requests, Max Agents)
3. Click **"Start"** to run
4. View results in the **"Output"** tab

**Done!** ✅

---

## Method 3: Deploy from GitHub

For continuous deployment and version control.

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., "zillow-realtor-profiles")
3. Initialize without README (we have one)

### Step 2: Push Code to GitHub

```bash
cd zillow-realtor-profiles

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Zillow realtor profiles scraper"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/zillow-realtor-profiles.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Connect GitHub to Apify

1. Go to https://console.apify.com/actors
2. Click **"Create new"**
3. Select **"From GitHub"**
4. Click **"Connect GitHub account"** (if not connected)
5. Authorize Apify to access your repositories
6. Select your repository: `zillow-realtor-profiles`
7. Set branch to `main`
8. Click **"Create"**

### Step 4: Configure Automatic Builds

1. In Actor settings, go to **"Source"** tab
2. Under "Git integration":
   - Enable **"Automatic builds"**
   - Select trigger: "On push to branch"
   - Branch: `main`
3. Click **"Save"**

Now every time you push to GitHub, Apify will automatically rebuild your Actor!

**Done!** ✅

---

## Verifying Your Deployment

After deployment by any method:

### 1. Check Actor Status

- Go to https://console.apify.com/actors
- Find "zillow-realtor-profiles"
- Status should show "Ready"

### 2. Test Run

1. Click on your Actor
2. Input tab should show:
   - Start URLs (default: Zillow agent reviews page)
   - Max Requests per Crawl (default: 100)
   - Max Agents (default: 50)
3. Click **"Start"**
4. Wait for completion (1-5 minutes depending on settings)

### 3. Check Results

1. Go to **"Output"** tab
2. You should see a table with:
   - Agent Name
   - Agency
   - Phone
   - Email
   - Profile URL
3. Click **"Export"** to download as JSON, CSV, or Excel

---

## Troubleshooting

### Build Failed

**Error**: "Cannot find module 'apify'"
- **Solution**: Make sure `package.json` is in the root directory

**Error**: "Dockerfile not found"
- **Solution**: Verify `Dockerfile` is in root directory, not in `.actor/`

### Actor Runs but Returns No Data

**Issue**: No agents scraped
- **Solution**: 
  1. Check if Start URL is correct
  2. Zillow may have changed their HTML structure
  3. Enable debug logging in `main.js`
  4. Check the run log for errors

### Rate Limiting / Blocked

**Issue**: Getting 403 errors or CAPTCHAs
- **Solution**:
  1. Reduce `maxRequestsPerCrawl`
  2. Add delays between requests
  3. Check if proxy is enabled (it should be by default)
  4. Consider upgrading to PlaywrightCrawler for browser simulation

---

## Making Updates

### Update via CLI

1. Make changes to your local files
2. Run `apify push` to deploy updates
3. New version will be created automatically

### Update via Web Interface

1. Go to **"Source"** tab
2. Edit files in Web IDE
3. Click **"Save"**
4. Click **"Build"**

### Update via GitHub

1. Make changes locally
2. Commit and push:
```bash
git add .
git commit -m "Update scraping selectors"
git push
```
3. Apify will automatically rebuild (if auto-build enabled)

---

## Next Steps

After successful deployment:

1. **Test with Different URLs**: Try different Zillow locations
2. **Schedule Runs**: Set up scheduled runs in Apify Console
3. **Integrate with APIs**: Use Apify API to run from your applications
4. **Monitor Usage**: Check your usage on the billing page
5. **Share Your Actor**: Make it public for others to use (optional)

---

## Support Resources

- **Apify Documentation**: https://docs.apify.com
- **Apify Discord**: https://discord.gg/apify
- **Crawlee Docs**: https://crawlee.dev
- **API Reference**: https://docs.apify.com/api/v2

---

## Free Tier Limits

Apify free tier includes:
- $5 of platform credits per month
- Unlimited Actor builds
- Unlimited storage for 7 days
- Community support

Perfect for testing and small projects!

---

**Need Help?** Check the Apify documentation or reach out to their support team.

Good luck with your scraping! 🚀
