import React, { useState, useEffect } from "react";
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

const ImageContainer = styled.div`
  width: 90px;
  height: 90px;
  margin-right: 8px;
  margin-bottom: 8px;
  position: relative;
  transition: transform 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: scale(1.1);
  }
`;

const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.5s ease; 
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

  ${ImageContainer}:hover & {
    opacity: 1;
  }
`;

const EnlargedImageContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transition: opacity 1.5s ease; 
  opacity: ${({ enlarged }) => (enlarged ? "1" : "0")}; 
  z-index: ${({ enlarged }) => (enlarged ? "1" : "-1")}; 
`;

const EnlargedImage = styled.img`
  width: 500px;
  max-height: 300px;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const CommentText = styled.p`
  margin-top: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  padding: 5px;
  margin-right: 10px;
`;

const PostButton = styled(Button)`
  color: #666;
`;

const ReplyContainer = styled.div`
  margin-left: 20px;
  margin-top: 10px;
`;

const InputForm = styled.form`
  display: flex;
  margin-top: 10px;
  align-items: center;
`;

const TextInput = styled.input`
  flex: 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [enlargedImage, setEnlargedImage] = useState(null);

  const getLoggedInUserName = () => {
    const username = localStorage.getItem("username");
    if (username) {
      setLoggedInUserName(username);
    }
  };

  useEffect(() => {
    getLoggedInUserName();
  }, []);

  const toggleReplies = () => setShowReplies(!showReplies);
  const toggleCommentForm = () => setShowCommentForm(!showCommentForm);

  const handleTextChange = (e) => setReplyText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loggedInUserName,
        text: replyText,
      }),
    });
    if (response.ok) {
      console.log("댓글이 성공적으로 전송되었습니다.");
      setReplyText("");
    } else {
      console.error("댓글 전송 중 오류가 발생했습니다.");
    }
  };

  const enlargeImage = (imageUrl) => {
    setEnlargedImage(imageUrl);
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
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
            <ImageContainer key={index} onClick={() => enlargeImage(image)}>
              <Image src={image} />
              <ImageOverlay />
            </ImageContainer>
          ))}
      </ImagesWrapper>
      <CommentText>{comment.text}</CommentText>
      <ButtonContainer>
        <Button onClick={toggleReplies}>댓글보기</Button>
        <Button onClick={toggleCommentForm}>댓글작성</Button>
      </ButtonContainer>
      {showCommentForm && (
        <InputForm onSubmit={handleSubmit}>
          <Username>{loggedInUserName}</Username>
          <TextInput
            placeholder="댓글을 입력하세요"
            value={replyText}
            onChange={handleTextChange}
          />
          <PostButton type="submit">Post</PostButton>
        </InputForm>
      )}
      {showReplies && (
        <ReplyContainer>
          {comment.replies &&
            comment.replies.map((reply, index) => <Reply key={index} reply={reply} />)}
        </ReplyContainer>
      )}
      <EnlargedImageContainer enlarged={enlargedImage !== null}>
        {enlargedImage && (
          <>
            <EnlargedImage src={enlargedImage} />
            <CloseButton onClick={closeEnlargedImage}>X</CloseButton>
          </>
        )}
      </EnlargedImageContainer>
    </CommentContainer>
  );
};

export default Comment;
