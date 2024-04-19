import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 0;
  animation: fadeIn 2s ease-out forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const VideoBackground = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <VideoContainer>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src="/videos/main_video-4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </VideoContainer>
  );
};

export default VideoBackground;
