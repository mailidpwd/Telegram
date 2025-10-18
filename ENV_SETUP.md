# Vercel Environment Variables Setup

To securely deploy your application on Vercel, you need to configure environment variables for your API keys. This ensures your sensitive keys are not exposed in your frontend code.

## 1. Access Project Settings
1. Go to your Vercel project dashboard.
2. Click on "Settings" tab
3. Click on "Environment Variables" in the left sidebar

## 2. Add These Variables

### OpenAI API Key
- **Name**: `OPENAI_API_KEY`
- **Value**: `YOUR_ACTUAL_OPENAI_API_KEY_HERE`
- **Environment**: Production, Preview, Development (select all)
- **⚠️ Important**: Use your actual OpenAI API key (starts with `sk-proj-`)

### Google Gemini API Key (Optional - currently disabled)
- **Name**: `GEMINI_API_KEY`
- **Value**: `YOUR_ACTUAL_GEMINI_KEY_HERE`
- **Environment**: Production, Preview, Development (select all)
- **⚠️ Important**: Use your actual Gemini API key (starts with `AIza`)

## 3. Redeploy

After adding environment variables:
1. Go to "Deployments" tab
2. Select your latest deployment and click "Redeploy" (or trigger a new deployment)

This will ensure your application uses the environment variables securely.

