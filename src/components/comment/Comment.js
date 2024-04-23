import React, { useState } from "react";
import styled from "styled-components";

const CommentContainer = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Username = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const PostDate = styled.span`
  color: #777;
`;

const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
`;

const ImageContainer = styled.div`
  width: 90px; 
  height: 90px; 
  margin-right: 8px;
  margin-bottom: 8px;
  position: relative;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const Image = styled.img`
  width: 100%; 
  height: 100%; 
  object-fit: cover;
  cursor: pointer; 
`;

const CommentText = styled.p`
  margin-top: 4px;
`;

const ReplyButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  padding: 5px;
`;

const ReplyContainer = styled.div`
  margin-left: 20px;
  margin-top: 10px;
`;

const Reply = ({ reply }) => (
  <ReplyContainer>
    <UserProfile>
      <Username>{reply.username}</Username>
      <PostDate>{reply.postDate}</PostDate>
    </UserProfile>
    <CommentText>{reply.text}</CommentText>
  </ReplyContainer>
);

const Comment = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const openImage = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };
  
  return (
    <CommentContainer>
      <UserProfile>
        <Username>{comment.username}</Username>
        <PostDate>{comment.postDate}</PostDate>
      </UserProfile>
      <ImagesWrapper>
        {comment.images &&
          comment.images.slice(0, 5).map((image, index) => (
            <ImageContainer key={index}>
              <Image
                src={image}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.7)} 
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)} 
                onClick={() => openImage(image)} 
              />
              <ImageOverlay />
            </ImageContainer>
          ))}
      </ImagesWrapper>
      <CommentText>{comment.text}</CommentText>
      <ReplyButton onClick={toggleReplies}>댓글보기</ReplyButton>
      {showReplies && (
        <ReplyContainer>
          {comment.replies &&
            comment.replies.map((reply, index) => (
              <Reply key={index} reply={reply} />
            ))}
        </ReplyContainer>
      )}
    </CommentContainer>
  );
};

export default Comment;
