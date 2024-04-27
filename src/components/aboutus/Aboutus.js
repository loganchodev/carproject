import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const bounceAnimation = keyframes`
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
  height: 160vh;
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

const filteredProps = ['animate', 'delay'];

const TitleStyled = styled(({ animate, delay, ...rest }) => <span {...rest} />).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !filteredProps.includes(prop) && defaultValidatorFn(prop),
})`
  display: inline-block;
  margin: 0 2px;
  animation: ${bounceAnimation} 0.5s forwards;
  animation-delay: ${props => props.delay}s;
  animation-iteration-count: 1;
  font-size: 48px;
  color: #fff;
`;

const Title = ({ text, delay }) => {
  const letters = text.split('');
  return (
    <h1 style={{ display: 'flex', justifyContent: 'center' }}>
      {letters.map((letter, index) => (
        <TitleStyled key={index} style={{ animationDelay: `${delay + index * 0.1}s` }}>
          {letter}
        </TitleStyled>
      ))}
    </h1>
  );
};

const SubTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-top: 40px;
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

const Aboutus = () => {
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
        <Title text="About Us" delay={0} />
      </TitleBackground>
      <SubTitle>마카롱에 오신 것을 환영합니다.</SubTitle>
      <Paragraph>
        마카롱은 자동차 소유자 및 자동차 구매를 계획 중인 분들을 위한 편리한 서비스를 제공합니다. 
        사용자들은 마카롱에서 주변의 주유소, 서비스 센터, 주차장, 세차장 등을 손쉽게 검색할 수 있을 뿐만 아니라, 
        각종 자동차 정보를 얻고 맞춤형 대시보드를 활용하여 자동차 관리에 도움을 받을 수 있습니다.
      </Paragraph>
      <SubTitle>주변 시설 검색</SubTitle>
      <Paragraph>
        마카롱을 통해 사용자들은 현재 위치 반경 1km 이내의 주유소, 서비스 센터, 주차장, 세차장 등과 같은 자동차 관련 시설을 손쉽게 찾아볼 수 있습니다.
        이를 통해 긴 여정을 떠날 때나 긴급한 상황에서 필요한 시설을 빠르게 찾을 수 있습니다.
      </Paragraph>
      <SubTitle>AI 챗봇 기능</SubTitle>
      <Paragraph>
        마카롱에는 AI 챗봇 기능이 탑재되어 있습니다. 사용자들은 어떠한 자동차 관련 질문이든지 AI 챗봇에게 물어볼 수 있습니다. 
        챗봇은 신속하고 정확한 답변을 제공하여 사용자들의 궁금증을 해소해 줍니다.
      </Paragraph>
      <SubTitle>자동차 조회 및 제원 확인</SubTitle>
      <Paragraph>
        자동차를 구매하려는 사용자들은 마카롱을 활용하여 다양한 자동차 종류를 쉽게 조회할 수 있습니다. 
        더불어 각 자동차의 제원과 성능에 대한 정보를 확인할 수 있어 더 나은 선택을 할 수 있습니다.
      </Paragraph>
      <SubTitle>맞춤형 대시보드 제공</SubTitle>
      <Paragraph>
        사용자들은 맞춤형 대시보드를 통해 자신의 자동차를 효율적으로 관리할 수 있습니다. 
        대시보드에서는 소모품 교체 주기를 포함한 유용한 정보를 제공하여 자동차의 유지 보수를 보다 효율적으로 할 수 있습니다.
      </Paragraph>
    </IntroContainer>
  );
};

export default Aboutus;
