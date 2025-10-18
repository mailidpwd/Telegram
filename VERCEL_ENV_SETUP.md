# 🔐 Vercel Environment Variables Setup Guide

## 📋 What You Need to Do on Vercel

After deploying your app to Vercel, you MUST add these environment variables for your app to work:

---

## 🚀 Step-by-Step Instructions

### 1. Go to Your Vercel Project Dashboard
- Open: https://vercel.com/dashboard
- Click on your deployed project: **`Telegram`** or similar name

### 2. Open Environment Variables Settings
- Click on **"Settings"** tab (top navigation)
- Click on **"Environment Variables"** in the left sidebar

### 3. Add Each Variable Below

---

## 🔑 Required Environment Variables

### ✅ Variable 1: OpenAI API Key (REQUIRED)

**Name:**
```
OPENAI_API_KEY
```

**Value:**
```
YOUR_ACTUAL_OPENAI_API_KEY_HERE
```
(Use your actual OpenAI API key starting with `sk-proj-`)

**Environments:** ✅ Select ALL three:
- ✅ Production
- ✅ Preview
- ✅ Development

**Click:** `Add` or `Save`

---

### ✅ Variable 2: Gemini API Key (REQUIRED)

**Name:**
```
GEMINI_API_KEY
```

**Value:**
```
YOUR_ACTUAL_GEMINI_API_KEY_HERE
```
(Get your Gemini API key from: https://makersuite.google.com/app/apikey)

**Environments:** ✅ Select ALL three:
- ✅ Production
- ✅ Preview
- ✅ Development

**Click:** `Add` or `Save`

---

## 🔄 Step 4: Redeploy Your Application

**IMPORTANT:** After adding environment variables, you MUST redeploy:

1. Go to **"Deployments"** tab
2. Click on the **three dots (...)** next to your latest deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes for redeployment to complete

---

## ✅ Verify It's Working

After redeployment:
1. Visit your live app URL (e.g., `https://telegram-yourname.vercel.app`)
2. Try the voice input feature
3. If voice works, ✅ **SUCCESS!** Your environment variables are set correctly!

---

## 📁 Local Development (.env.local file)

For testing on your computer, I've created a `.env.local` file in your project folder with all the keys.

**Location:** `C:\Users\Michael\Documents\RDM Projects\telegram\.env.local`

This file is automatically ignored by Git (won't be pushed to GitHub for security).

---

## 🆘 Troubleshooting

### Problem: Voice input or AI parsing not working after deployment
**Solution:** 
1. Double-check that both `OPENAI_API_KEY` and `GEMINI_API_KEY` are added in Vercel
2. Make sure you selected all environments (Production, Preview, Development)
3. **Redeploy** after adding variables
4. Check Function Logs for any API key errors

### Problem: API key showing in browser console
**Solution:** This is normal for the serverless function approach. The actual API calls happen server-side via `/api/transcribe` and `/api/gemini`, keeping your keys secure.

---

## 📞 Need Help?

If something's not working:
1. Check Vercel deployment logs: **Deployments** → Click on deployment → **View Function Logs**
2. Look for errors related to `OPENAI_API_KEY`
3. Make sure you redeployed after adding environment variables

---

**Your app is ready to go live! 🚀**

