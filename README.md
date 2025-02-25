# Gmail Spam Detection Script

## 📌 Overview
This script automatically labels suspicious emails in your Gmail inbox as **"Spam Test"** based on the following criteria:
- **Message-ID format:** Detects emails using UUID-style Message-IDs.
- **Subject check:** Flags emails that contain your name (default: "Alexis").
- **Marketing detection:** Identifies marketing emails by checking for `List-Unsubscribe` headers.
- **Exclusion of trusted domains:** Prevents false positives from known senders (Google, Microsoft, Amazon, etc.).

## 🚀 Installation Guide

### Step 1: Open Google Apps Script
1. Go to [Google Apps Script](https://script.google.com/).
2. Click on **New Project**.

### Step 2: Add the Script
1. Copy and paste the script into the editor:


### Step 3: Save and Test the Script
1. Click **File** → **Save**.
2. Click **Run** → **Run Function** → `labelSpamEmailsByUUID`.
3. Check Gmail to see if suspicious emails are labeled **"Spam Test"**.

### Step 4: Automate the Script
1. Click on **Triggers (⏳ Clock icon)**.
2. Click **+ Add Trigger**.
3. Set the following:
   - Function: `labelSpamEmailsByUUID`
   - Event Source: **Time-driven**
   - Type: **Hourly** (or adjust as needed)
4. Click **Save**.

## 🔄 Updating Your Name
To change the name detection from "Alexis" to another name:
- Edit this line in the script:
  ```javascript
  var userName = "YourName";  // Replace "YourName" with your actual name
  ```

🚀 Enjoy your automated Gmail spam filtering!
