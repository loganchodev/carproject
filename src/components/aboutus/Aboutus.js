import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';

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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 200vh;
  margin: auto;
  overflow: hidden;
`;

const TitleBackground = styled.div`
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url('./images/manager.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  width: 100%;
  height: 270px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
  padding-right: 20%;
  animation: ${scrollMove} 2s forwards;
`;

const TitleStyled = styled.span`
  display: inline-block;
  margin: 0 2px;
  animation: ${bounce} 0.5s forwards;
  animation-delay: ${props => props.delay}s;
  animation-iteration-count: 1;
  font-size: 48px;
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
  color: #333;
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
  animation: ${props => (props.inView ? css`${fadeIn} 1s forwards` : 'none')};
  border-radius: 8px;
`;

const Aboutus = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [scrollY, setScrollY] = useState(0);

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
        <Title text="About Us" />
      </TitleBackground>
      <SubTitle>Welcome to MyCarLong</SubTitle>
      <Paragraph>
        Pexels provides high quality and completely free stock photos licensed under the Pexels license.
        All photos are nicely tagged, searchable and also easy to discover through our discover pages.
      </Paragraph>
      <SubTitle>Photos</SubTitle>
      <Paragraph>
        We have hundreds of thousands free stock photos and every day new high resolution photos will be added.
        All photos are hand-picked from photos uploaded by our users or sourced from free image websites.
        We make sure all published pictures are high-quality and licensed under the Pexels license.
      </Paragraph>
      <SubTitle>Photo Sources</SubTitle>
      <Paragraph>
        Only free images from our community of photographers are added to our photo database.
        We constantly try to deliver as many high quality free stock photos as possible to the creatives who use our website.
      </Paragraph>
      <SubTitle>Team</SubTitle>
      <Paragraph>
        Pexels is run by Bruno Joseph, Ingo Joseph and Daniel Frese. Bruno and Ingo co-founded Pexels together in 2014 and Daniel joined them in 2015.
      </Paragraph>
      <SubTitle>Mission</SubTitle>
      <Paragraph>
        We help millions of designers, writers, artists, programmers and other creators to get access to beautiful photos that they can use freely which empowers them to create amazing products, designs, stories, websites, apps, art and other work. We call it: "Empowering Creators"
      </Paragraph>
      <SubTitle>Contribute</SubTitle>
      <Paragraph>
        Upload your own pictures to support the Pexels community:
        <br />
        <button>Start Uploading</button>
      </Paragraph>
      <Paragraph>
        And don't forget to share, like and follow Pexels on Instagram, Facebook and X ;)
      </Paragraph>
    </IntroContainer>
  );
};

export default Aboutus;
