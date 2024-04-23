import React, { useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const CommentMain = () => {
  const initialComments = [
    {
      id: 1,
      username: "user1",
      postDate: "2024-01-01",
      text: "이게 댓글이다 얼마나 길게 쓸 수 있나 볼까. 얼마나 길게 쓸 수 있나 볼까.얼마나 길게 쓸 수 있나 볼까.얼마나 길게 쓸 수 있나 볼까.얼마나 길게 쓸 수 있나 볼까.얼마나 길게 쓸 수 있나 볼까.",
      images: [
        "./images/dashboard.jpg",
        "./images/vehicle-1.jpg",
        "./images/setting-1.jpg",
        "./images/introduction-3.jpg",
      ],
      replies: [
        {
          username: "User3",
          postDate: "2024-01-02",
          text: "이건 대댓글이다.",
        },
      ],
    },
    {
      id: 2,
      username: "user2",
      postDate: "2024-01-01",
      text: "두번째 댓글이다.",
    },
    {
      id: 3,
      username: "user3",
      postDate: "2024-04-23",
      text: "이미지 테스트",
      images: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150"
      ],
      replies: [
        {
          username: "User3",
          postDate: "2024-01-02",
          text: "이건 대댓글이다.",
        },
      ],
    },
  ];

  const [comments, setComments] = useState(initialComments);

  const handleAddComment = (text, file) => {
    const newComment = {
      id: comments.length + 1,
      username: "newUser",
      postDate: new Date().toISOString(),
      text: text,
      replies: [],
    };
    setComments([...comments, newComment]); 
  };

  return (
    <div style={{ width: "500px" }}>
      <CommentForm onAddComment={handleAddComment} />
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} /> 
      ))}
    </div>
  );
};

export default CommentMain;
