// Vercel Serverless Function for OpenAI Whisper API
export const config = {
  api: {
    bodyParser: false,
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

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  
  if (!OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY not found in environment variables');
    return res.status(500).json({ 
      error: 'OpenAI API key not configured in Vercel environment variables.',
      hint: 'Add OPENAI_API_KEY in Project Settings > Environment Variables'
    });
  }

  console.log('✅ OPENAI_API_KEY found, forwarding request to OpenAI...');

  try {
    // Get the raw request body and forward it to OpenAI
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Extract content-type from original request
    const contentType = req.headers['content-type'];

    const openaiResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': contentType,
      },
      body: buffer,
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error('❌ OpenAI API Error:', openaiResponse.status, errorText);
      return res.status(openaiResponse.status).json({ 
        error: `OpenAI API error: ${errorText}`,
        status: openaiResponse.status
      });
    }

    const data = await openaiResponse.json();
    console.log('✅ OpenAI transcription successful:', data.text?.substring(0, 50) + '...');
    return res.status(200).json(data);
  } catch (error) {
    console.error('❌ Serverless function error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message 
    });
  }
}
