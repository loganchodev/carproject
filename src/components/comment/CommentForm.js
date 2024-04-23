import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const FormContainer = styled.form`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f0f2f5;
`;

const TextInput = styled.input`
  flex-grow: 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 8px 16px;
  background-color: transparent;
  color: #666; 
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: #333; 
  }
`;

const FileInput = styled.input`
  display: none; 
`;

const IconContainer = styled.label`
  margin-right: 10px;
  cursor: pointer;
`;

const CommentText = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CommentForm = ({ onAddComment }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [showFullText, setShowFullText] = useState(false);

  const handleTextChange = (e) => setText(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddComment(text, file);
    setText("");
    setFile(null);
  };

  const toggleTextVisibility = () => {
    setShowFullText(!showFullText);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TextInput type="text" placeholder="댓글을 입력하세요." value={text} onChange={handleTextChange} />
      <IconContainer>
        <FontAwesomeIcon icon={faImage} size="lg" /> 
        <FileInput type="file" onChange={handleFileChange} />
      </IconContainer>
      <SubmitButton type="submit">Post</SubmitButton>
      <CommentText onClick={toggleTextVisibility}>
        {text.length > 20 && !showFullText ? text.slice(0, 20) + "..." : text}
        {text.length > 20 && !showFullText && <span>더보기</span>}
        {showFullText && text}
      </CommentText>
    </FormContainer>
  );
};

CommentForm.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

export default CommentForm;
