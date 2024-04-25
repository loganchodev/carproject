require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/api/chat', async (req, res) => {
    const { text } = req.body;
    console.log('Received text from frontend:', text); // 추가

    try {
        const response = await fetch(`${process.env.REACT_APP_GPT_API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_GPT_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{
                    role: 'user',
                    content: text
                }]
            })
        });

        console.log('GPT API Response Status:', response.status); // 추가

        if (!response.ok) {
            const errorText = await response.text();
            console.error('GPT API Response Error:', errorText);
            throw new Error('Failed to fetch response from GPT API');
        }

        const data = await response.json();
        console.log('Received response from GPT API:', data); // 추가
        res.json({ message: data.choices[0].text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
