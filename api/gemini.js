// Vercel Serverless Function for Google Gemini API
export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
  if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in environment variables');
    return res.status(500).json({ 
      error: 'Gemini API key not configured in Vercel environment variables.',
      hint: 'Add GEMINI_API_KEY in Project Settings > Environment Variables'
    });
  }

  console.log('✅ GEMINI_API_KEY found, forwarding request to Gemini...');

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
    
    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('❌ Gemini API Error:', geminiResponse.status, errorText);
      return res.status(geminiResponse.status).json({ 
        error: `Gemini API error: ${errorText}`,
        status: geminiResponse.status
      });
    }

    const data = await geminiResponse.json();
    console.log('✅ Gemini API request successful');
    return res.status(200).json(data);
  } catch (error) {
    console.error('❌ Serverless function error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message 
    });
  }
}
