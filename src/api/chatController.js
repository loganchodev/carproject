const fetch = require('node-fetch');

const handleChat = async (req, res) => {
    const { text } = req.body;
    console.log('리액트 채팅창에서 입력한 텍스트:', text);

    if (!process.env.REACT_APP_GPT_API_URL || !process.env.REACT_APP_GPT_API_KEY) {
        console.error('GPT API 설정 오류: API URL 또는 API 키가 설정되지 않았습니다.');
        return res.status(500).json({ error: '서버 설정 오류: GPT API URL 또는 API 키가 설정되지 않았습니다.' });
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_GPT_API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_GPT_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',  // 모델 ID를 확인하고 정확한 값을 사용하세요
                messages: [{
                    role: 'user',  // 'user' 또는 'assistant' 역할 추가
                    content: text   // 'text'를 'content'로 변경
                }]
            })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('GPT API 응답 오류:', errorResponse);
            return res.status(response.status).json({ error: 'GPT API 응답 오류: ' + errorResponse.error.message });
        }

        const data = await response.json();
        if (!data.choices || data.choices.length === 0 || !data.choices[0].text) {
            throw new Error('GPT API 응답 오류: 메시지를 가져올 수 없습니다.');
        }

        const message = data.choices[0].text;
        res.json({ message });
    } catch (error) {
        console.error('채팅 처리 중 오류 발생:', error.message);
        res.status(500).json({ error: '채팅 처리 중 오류 발생: ' + error.message });
    }
};

module.exports = {
    handleChat
};
