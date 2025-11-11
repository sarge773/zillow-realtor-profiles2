# 🚀 Quick Start Guide

Get your Zillow Realtor Profiles Scraper running on Apify in 5 minutes!

## ⚡ Fastest Method (CLI)

### 1. Install Apify CLI

**Mac/Linux:**
```bash
curl -fsSL https://apify.com/install-cli.sh | bash
```

**Windows PowerShell:**
```powershell
irm https://apify.com/install-cli.ps1 | iex
```

### 2. Login to Apify
```bash
apify login
```
(Creates account if needed: https://console.apify.com/sign-up)

### 3. Navigate to Actor Folder
```bash
cd zillow-realtor-profiles
```

### 4. Deploy!
```bash
apify push
```

**That's it!** 🎉 Your Actor is live on Apify.

---

## 📱 Alternative: Web Upload

Don't want to use CLI? No problem!

### 1. Create Account
- Go to: https://console.apify.com/sign-up
- Sign up (it's free!)

### 2. Create New Actor
- Go to: https://console.apify.com/actors
- Click **"Create new"** → Select **"Empty"**
- Name it: "zillow-realtor-profiles"

### 3. Upload Files
- Click **"Source"** tab
- Upload these files maintaining folder structure:
  ```
  .actor/
    ├── actor.json
    ├── input_schema.json
    ├── dataset_schema.json
    └── output_schema.json
  src/
    └── main.js
  Dockerfile
  package.json
  ```

### 4. Build & Run
- Click **"Build"** button
- Wait for build to complete
- Click **"Start"** to run!

---

## 🎯 First Run Configuration

Once deployed, configure your first run:

**Input Settings:**
- **Start URLs**: `https://www.zillow.com/professionals/real-estate-agent-reviews/`
- **Max Requests**: `20` (for testing)
- **Max Agents**: `10` (for testing)

**Click "Start"** and watch it scrape!

---

## 📊 What You'll Get

Example output:
```json
{
  "name": "Sarah Johnson",
  "email": "sarah.j@example.com",
  "phone": "(555) 123-4567",
  "agency": "Prime Realty Group",
  "profileUrl": "https://www.zillow.com/profile/sarah-johnson"
}
```

---

## 🛟 Need Help?

**Full Documentation:**
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Complete step-by-step guide
- [README.md](README.md) - Actor features and customization

**Apify Resources:**
- Documentation: https://docs.apify.com
- Discord: https://discord.gg/apify

---

## ⚠️ Important Notes

1. **Legal**: Ensure compliance with Zillow's Terms of Service
2. **Testing**: Start with small limits (10-20 agents) to test
3. **Updates**: Zillow may change their HTML - be ready to update selectors
4. **Free Tier**: $5/month credits included - perfect for getting started!

---

**Ready?** Choose your method above and start scraping! 🏠
