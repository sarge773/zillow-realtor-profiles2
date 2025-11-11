# ✅ CORRECT FILE STRUCTURE FOR APIFY

## This is what your Actor structure MUST look like:

```
zillow-realtor-profiles/
│
├── 📁 .actor/                          ← Folder (note the dot!)
│   ├── 📄 actor.json                   ← Config file
│   ├── 📄 input_schema.json            ← Input definition
│   ├── 📄 dataset_schema.json          ← Dataset schema
│   └── 📄 output_schema.json           ← Output definition
│
├── 📁 src/                             ← Source code folder
│   └── 📄 main.js                      ← MAIN SCRAPER CODE (CRITICAL!)
│
├── 📄 Dockerfile                       ← Docker configuration
├── 📄 package.json                     ← NPM dependencies
├── 📄 package-lock.json                ← Dependency lock file
├── 📄 .gitignore                       ← Git ignore rules
├── 📄 AGENTS.md                        ← AI agent docs
├── 📄 README.md                        ← Actor documentation
├── 📄 DEPLOYMENT_GUIDE.md              ← Deployment instructions
├── 📄 QUICKSTART.md                    ← Quick start guide
└── 📄 TROUBLESHOOTING.md               ← This file!
```

---

## 🎯 CRITICAL FILES FOR ACTOR TO WORK

These are the MINIMUM files needed:

```
✅ REQUIRED:
├── .actor/
│   ├── actor.json          ← Actor config
│   ├── input_schema.json   ← Input form
│   └── output_schema.json  ← Output config
├── src/
│   └── main.js             ← MAIN CODE (MOST IMPORTANT!)
├── Dockerfile              ← Container setup
└── package.json            ← Dependencies
```

---

## ⚠️ COMMON MISTAKES

### ❌ MISTAKE 1: main.js in wrong location

```
WRONG:
zillow-realtor-profiles/
├── .actor/
├── main.js              ← ❌ NOT HERE!
└── Dockerfile
```

### ❌ MISTAKE 2: No src folder

```
WRONG:
zillow-realtor-profiles/
├── .actor/
├── main.js              ← ❌ NEEDS TO BE IN src/
└── Dockerfile
```

### ❌ MISTAKE 3: Dockerfile in .actor folder

```
WRONG:
zillow-realtor-profiles/
├── .actor/
│   ├── actor.json
│   └── Dockerfile       ← ❌ NOT HERE!
└── package.json
```

### ✅ CORRECT: Everything in right place

```
CORRECT:
zillow-realtor-profiles/
├── .actor/
│   ├── actor.json       ✅
│   ├── input_schema.json ✅
│   └── output_schema.json ✅
├── src/
│   └── main.js          ✅ IN src/ FOLDER!
├── Dockerfile           ✅ IN ROOT!
└── package.json         ✅
```

---

## 🔍 HOW TO VERIFY IN APIFY WEB CONSOLE

### Step 1: Go to Source Tab
1. Open your Actor in Apify Console
2. Click "Source" tab
3. Look at file tree on LEFT side

### Step 2: Check File Tree
You should see:

```
📁 .actor
  📄 actor.json
  📄 input_schema.json
  📄 dataset_schema.json
  📄 output_schema.json
📁 src
  📄 main.js           ← VERIFY THIS EXISTS!
📄 Dockerfile
📄 package.json
```

### Step 3: Verify main.js
1. Click on `src/main.js`
2. File should open and show ~150 lines of code
3. First lines should be:
   ```javascript
   // Apify SDK - toolkit for building Apify Actors
   import { Actor } from 'apify';
   ```

---

## 🛠️ HOW TO FIX IN APIFY WEB CONSOLE

### If src folder is missing:

1. Click "**+**" button (top of file tree)
2. Select "**New folder**"
3. Name: `src`
4. Press Enter

### If main.js is in wrong place:

1. **Create main.js in correct location:**
   - Click on `src` folder
   - Click "**+**" button
   - Select "**New file**"
   - Name: `main.js`
   - Press Enter

2. **Copy the code:**
   - Open downloaded ZIP file
   - Find `src/main.js`
   - Open in text editor
   - Copy ALL code

3. **Paste into Apify:**
   - Click on your new `src/main.js` in Apify
   - Paste the code
   - Click "**Save**"

4. **Delete old file** (if main.js was in wrong place):
   - Right-click the incorrectly placed main.js
   - Click "Delete"

---

## 🚀 EASIEST FIX: USE APIFY CLI

Skip all manual work:

```bash
# 1. Extract ZIP
cd path/to/zillow-realtor-profiles-clean

# 2. Login
apify login

# 3. Deploy (handles structure automatically)
apify push
```

Done! The CLI creates the perfect structure every time. ✅

---

## 📞 NEED MORE HELP?

If you're still stuck:

1. **Delete the Actor** and start fresh
2. **Use CLI method** (easiest and most reliable)
3. **Or use GitHub method** (automatic structure)

Both methods in DEPLOYMENT_GUIDE.md!
