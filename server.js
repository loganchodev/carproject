require("dotenv").config();
const express = require("express");
const app = express();
const fetch = require("node-fetch");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post("/api/chat", async (req, res) => {
  const { text } = req.body;
  console.log("프론트엔드에서 텍스트를 수신했습니다:", text);

  try {
    console.log("GPT API로 차와 관련된 질문인지 확인 중입니다...");
    const response = await fetch(
      `https://api.openai.com/v1/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GPT_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: "This assistant searches for topics related to cars and understands Korean." },
            { role: "user", content: text },
          ],
          max_tokens: 200, 
        }),
      }
    );

    console.log("응답을 받았습니다. 처리 중입니다...");
    const responseData = await response.json();
    const gptMessage = responseData.choices[0].message;
    console.log("메시지 객체의 자세한 내용:", gptMessage);

    res.json({ message: gptMessage.content });
  } catch (error) {
    console.error("오류가 발생했습니다:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
