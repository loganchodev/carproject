import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import CommentMain from '../comment/CommentMain';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const scrollMove = keyframes`
  0% { background-position-y: 0; }
  100% { background-position-y: calc(100% - ${props => props.imageHeight}px); }
`;

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 100%;
  margin: auto;
  overflow: hidden;
`;

const TitleBackground = styled.div`
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.5), 
      rgba(0, 0, 0, 0.5)
    ), url('./images/manager.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  width: 100%;
  height: 270px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 500px;
  padding-right: 20%;
  animation: ${scrollMove} 2s forwards;
`;

const TitleStyled = styled.span`
  display: inline-block;
  margin: 0 2px;
  animation: ${bounce} 0.5s forwards;
  animation-delay: ${props => props.delay}s;
  animation-iteration-count: 1;
  font-size: 32px;
  color: #fff;
`;

const Title = ({ text }) => {
  const letters = text.split('');
  return (
    <h1 style={{ display: 'flex', justifyContent: 'center' }}>
      {letters.map((letter, index) => (
        <TitleStyled key={index} delay={index * 0.05}>
          {letter}
        </TitleStyled>
      ))}
    </h1>
  );
};

const SubTitle = styled.h2`
  font-size: 24px;
  color: #666;
  margin-top: 30px;
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  max-width: 800px;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 800px;
  margin-top: ${props => props.marginTop}px; 
  opacity: 0;
  animation: ${props => props.inView ? css`${fadeIn} 1s forwards` : 'none'};
  border-radius: 8px;
`;

const Aboutus = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  const [scrollY, setScrollY] = useState(0);
  const [comments, setComments] = useState([
    {
      id: 1,
      username: "user1",
      postDate: "2024-01-01",
      text: "이게 댓글이다.",
      replies: [
        {
          username: "replyUser1",
          postDate: "2024-01-02",
          text: "이건 대댓글이다.",
        },
      ],
    },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <IntroContainer>
      <TitleBackground>
        <Title text="Welcome To MyCarLong" />
      </TitleBackground>
      {comments.map((comment) => (
        <CommentMain key={comment.id} comment={comment} /> 
      ))}
      <SubTitle>Our Goal</SubTitle>
      <Paragraph>
        모든 사람이 자동차 서비스를 쉽게 접근할 수 있도록 하여, 번거로움 없이 근처의 최고 옵션을 찾을 수 있도록 하는 것입니다.
      </Paragraph>
      <StyledImage ref={ref} inView={inView} src="/path/to/your/image1.jpg" alt="Service Image" marginTop={-scrollY / 3} />
    </IntroContainer>
  );
};

export default Aboutus;