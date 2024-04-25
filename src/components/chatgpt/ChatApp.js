import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fafafa;
`;

const ChatBox = styled.div`
  max-width: 400px;
  width: 100%;
  min-height: 600px;
  max-height: 600px;
  overflow-y: auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Message = styled.div.withConfig({
  shouldForwardProp: prop => !['sender'].includes(prop)
})`
  padding: 10px 20px;
  margin: 5px;
  border-radius: 10px;
  color: #333;
  max-width: 80%;
  ${props => props.sender === 'user' ? css`
    background-color: #ffff99; 
    align-self: flex-end;
  ` : css`
    background-color: #f0f0f0; 
    align-self: flex-start;
  `}
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background-color: #f2f2f2;
  padding: 15px;
  font-size: 16px;
  border-radius: 20px;
  outline: none;
  margin-right: 10px;

  &::placeholder {
    color: #999;
  }
`;

const SendButton = styled.button`
  padding: 15px 30px;
  background-color: #0095f6;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0077b5;
  }
`;

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const newMessage = { text: inputText, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/chat', { text: inputText });
      const responseData = response.data;
      console.log('Received response from server:', responseData);
      
      if (responseData && responseData.message) {
        const gptMessage = responseData.message;
        setMessages(prevMessages => [...prevMessages, { text: gptMessage, sender: 'gpt' }]);
      } else {
        throw new Error('Invalid server response');
      }
    } catch (error) {
      console.error('Error while fetching response from server:', error);
      setMessages(prevMessages => [...prevMessages, { text: 'Failed to fetch response from server.', sender: 'gpt' }]);
    }    
  };
  
  return (
    <Container>
      <ChatBox>
        <div style={{ overflowY: 'auto', flex: 1 }}> 
          {messages.map((msg, index) => (
            <Message key={index} sender={msg.sender}>
              {msg.text}
            </Message>
          ))}
        </div>
        <InputContainer>
          <Input
            type="text"
            placeholder="차에 대해 궁금한 점을 물어보세요."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            ref={inputRef}
          />
          <SendButton onClick={handleSend}>Send</SendButton>
        </InputContainer>
      </ChatBox>
    </Container>
  );
}

export default ChatApp;
