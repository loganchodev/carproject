require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/api/chat', async (req, res) => {
  const { text } = req.body;
  console.log('Received text from frontend:', text);

  try {
    const gptApiKey = process.env.GPT_API_KEY;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${gptApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'This assistant searches for topics related to cars and understands Korean.' },
          { role: 'user', content: text },
        ],
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from GPT API');
    }

    const responseData = await response.json();
    const gptMessage = responseData.choices[0].message;
    console.log('Message from OpenAI:', gptMessage);

    res.json({ message: gptMessage.content });
  } catch (error) {
    console.error('Error during GPT API request:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/vehicle', async (req, res) => {
  const { model, year } = req.body;
  console.log(`Vehicle model and year requested: ${model} ${year}`);

  try {
    const vertexApiKey = process.env.VERTEX_API_KEY;
    const apiUrl = 'https://asia-northeast3-aiplatform.googleapis.com/v1/projects/focal-time-421105/locations/asia-northeast3/publishers/google/models/gemini-1.5-pro:streamGenerateContent';

    const requestBody = {
      inputs: {
        text: `${year}년 ${model} 차량 정보`
      }
    };

    console.log('Sending request to Vertex AI...');
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${vertexApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Vertex AI response failed: ${response.status} - ${response.statusText}`);
    }

    const textResponse = await response.text();
    console.log('Response text:', textResponse);
    const responseData = JSON.parse(textResponse);
    const predictions = responseData.predictions[0].outputs.text;
    const vehicleInfo = parseCarInfo(predictions);
    console.log('Parsed vehicle info:', vehicleInfo);
    res.json(vehicleInfo);
  } catch (error) {
    console.error('Error during Vertex AI request:', error);
    res.status(500).json({ error: error.message });
  }
});

function parseCarInfo(text) {
  const regex = /((?:[가-힣]+\s*)+)\s*(\d{4})\s*년형\s*(.*?)가격\s*(\d{1,8})원\s*(.*?)\s*엔진\s*(.*?)\s*변속기\s*(.*?)\s*연비\s*(.*?)/g;
  const match = regex.exec(text);
  if (match) {
    return {
      model: match[1].trim(),
      price: parseInt(match[4].replace(/,/g, '')),
      specs: {
        engine: match[6].trim(),
        transmission: match[7].trim(),
        fuelEconomy: match[8].trim()
      }
    };
  }
  return null;
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
