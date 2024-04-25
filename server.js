require('dotenv').config(); // 환경 변수를 로드합니다.
const express = require("express");
const app = express();
const fetch = require("node-fetch");
const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post("/api/chat", async (req, res) => {
    const { text } = req.body;
    console.log("Received text from frontend:", text);
  
    try {
      const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GPT_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: text,
            },
          ],
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("GPT API Response Error:", errorText);
        throw new Error("Failed to fetch response from GPT API");
      }
  
      const data = await response.json();
      console.log("Received response from GPT API:", data);
  
      // 출력할 'message' 객체의 구조를 확인
      const gptMessage = data.choices[0].message;
      console.log("Detailed view of the message object:", gptMessage);
  
      res.json({ message: gptMessage.content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
