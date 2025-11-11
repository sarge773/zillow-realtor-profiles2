# 🔧 FIXING "Cannot find module '/usr/src/app/src/main.js'" ERROR

## ❌ The Problem

You're seeing this error:
```
Error: Cannot find module '/usr/src/app/src/main.js'
```

This means the `src/main.js` file isn't in the right place in your Actor.

---

## ✅ SOLUTION 1: Verify Directory Structure (Web Upload)

If you uploaded via web interface, check your file structure:

### Go to Apify Console
1. Open your Actor: https://console.apify.com/actors
2. Click on "zillow-realtor-profiles"
3. Go to **"Source"** tab
4. Check the file tree on the left

### Required Structure
Your file tree MUST look EXACTLY like this:

```
📁 .actor/
  📄 actor.json
  📄 input_schema.json
  📄 dataset_schema.json
  📄 output_schema.json
📁 src/
  📄 main.js          ← THIS IS CRITICAL!
📄 Dockerfile
📄 package.json
📄 AGENTS.md
📄 README.md
```

### Common Mistakes

❌ **WRONG**: `main.js` in root folder
```
📄 main.js          ← NO! Wrong location
📁 src/
  (empty)
```

❌ **WRONG**: No `src` folder
```
📄 main.js          ← NO! Must be in src/
📄 Dockerfile
```

✅ **CORRECT**: `main.js` inside `src` folder
```
📁 src/
  📄 main.js        ← YES! Correct location
📄 Dockerfile
```

---

## ✅ SOLUTION 2: Re-upload Files Correctly

### Step-by-Step Fix

1. **In Apify Console → Source tab**

2. **Delete the incorrect file** (if main.js is in wrong place):
   - Right-click on the file
   - Click "Delete"

3. **Create `src` folder** (if it doesn't exist):
   - Click the "**+**" button at the top of file tree
   - Select "**New folder**"
   - Name it exactly: `src`
   - Click "Create"

4. **Create `main.js` inside `src`**:
   - Click on the `src` folder to select it
   - Click the "**+**" button
   - Select "**New file**"
   - Name it exactly: `main.js`
   - Click "Create"

5. **Paste the main.js code**:
   - Open your downloaded `zillow-realtor-profiles.zip`
   - Open `src/main.js` in a text editor
   - Copy ALL the code
   - Paste into the web editor
   - Click "**Save**"

6. **Rebuild the Actor**:
   - Click "**Build**" button (top right)
   - Wait for build to complete
   - Click "**Start**" to test

---

## ✅ SOLUTION 3: Use Apify CLI (Recommended)

The CLI handles file structure automatically and is much easier:

### Install CLI

**Mac/Linux:**
```bash
curl -fsSL https://apify.com/install-cli.sh | bash
```

**Windows (PowerShell as Admin):**
```powershell
irm https://apify.com/install-cli.ps1 | iex
```

### Deploy

```bash
# Extract the ZIP file
cd /path/to/zillow-realtor-profiles-clean

# Login (first time only)
apify login

# Deploy (this will handle everything correctly)
apify push
```

This automatically uploads the correct file structure!

---

## ✅ SOLUTION 4: Verify File Content

Make sure `src/main.js` has the actual code, not just an empty file.

### Check File Size
- `src/main.js` should be about **5-6 KB**
- If it's 0 bytes or very small, the content didn't upload

### Re-paste the Code
1. Open the downloaded `src/main.js`
2. Copy the ENTIRE file content (it's about 150 lines)
3. In Apify web editor, select all and delete
4. Paste the full code
5. Save

---

## ✅ SOLUTION 5: Check package.json

Verify your `package.json` has the correct start script:

```json
{
  "scripts": {
    "start": "node src/main.js"
  }
}
```

If it says something different, fix it to match above.

---

## 🔍 How to Verify It's Fixed

Before rebuilding, check:

1. ✅ File tree shows `src/` folder
2. ✅ `main.js` is INSIDE the `src/` folder
3. ✅ `main.js` file size is ~5-6 KB (not empty)
4. ✅ `package.json` has `"start": "node src/main.js"`

Then:
1. Click **"Build"**
2. Wait for build success
3. Click **"Start"**
4. Should work! ✅

---

## 🆘 Still Not Working?

### Option 1: Delete and Recreate

1. Delete the current Actor
2. Create a new one
3. Use **Apify CLI** method (much easier!)

```bash
cd zillow-realtor-profiles-clean
apify login
apify push
```

### Option 2: Use GitHub Method

1. Push code to GitHub
2. Connect Actor from GitHub
3. Apify will build it correctly

---

## 📋 Quick Checklist

Before you rebuild, verify:

- [ ] `src` folder exists
- [ ] `main.js` is inside `src` folder (not root)
- [ ] `main.js` has code (~5-6 KB file)
- [ ] `.actor` folder exists with 4 JSON files
- [ ] `Dockerfile` is in root (not in `.actor`)
- [ ] `package.json` is in root
- [ ] `package.json` has `"start": "node src/main.js"`

---

## 💡 Pro Tip

**Use Apify CLI** - it's faster and handles everything correctly:

```bash
apify push
```

No manual file management needed! 🚀

---

## ✅ Success Looks Like This

After fixing, your build log should show:
```
✓ Container started
✓ Starting Zillow Realtor Profiles Scraper...
✓ Max requests per crawl: 100
✓ Processing https://...
```

No more "Cannot find module" errors! 🎉
