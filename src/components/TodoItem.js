import React, { useState } from "react";
import Comment from "./Comment";
import api from "../utils/api";
import { Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const TodoItem = ({
  item,
  taskId,
  deleteItem,
  toggleComplete,
  commentList,
}) => {
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const toggleComments = () => {
    console.log(commentList);
    setIsCommentVisible(!isCommentVisible);
  };

  const getComments = async (taskId) => {
    try {
      const response = await api.get(`/tasks/${taskId}/comments`)
      if (response.status === 200) {

      }
    } catch (err) {
      
    }
  }

  const deleteComment = async (taskId, commentId) => {
    console.log(taskId, commentId);
    try {
      const response = await api.delete(
        `/tasks/${taskId}/comments/${commentId}`
      );
      if (response.status === 200) {
        getComments(taskId);
      }
    } catch (err) {}
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
      <div className={`todo-item ${item.isComplete ? "item-complete" : ""}`}>
        <Row className="align-items-center">
          <Col className="todo-name">{item.taskName}</Col>
          <Col className="todo-author">
            {item.author && "by " + item.author.name}
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs={12} className="d-flex align-items-center">
            <div>💬</div>
            <div onClick={toggleComments} className="button-comment">
              {isCommentVisible ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </Col>
        </Row>
        {isCommentVisible && (
          <div>
            {commentList.length > 0
              ? commentList.map((item) => (
                  <Comment
                    item={item}
                    deleteComment={() => deleteComment(taskId, item._id)}
                  />
                ))
              : ""}

            <Row>
              <Col>
                <InputGroup>
                  <Form.Control
                    placeholder="add note..."
                    onChange={(event) => setCommentInput(event.target.value)}
                  />
                  <Button variant="outline-secondary">add</Button>
                </InputGroup>
              </Col>
            </Row>
          </div>
        )}
        <div>
          <button
            className="button-delete"
            aria-label="Delete task"
            onClick={() => deleteItem(item._id)}
          >
            ❌
          </button>
          <button
            className="button-update"
            aria-label={item.isComplete ? "Unmark" : "Mark as done"}
            onClick={() => toggleComplete(item._id)}
          >
            {item.isComplete ? "🔄 " : "✅"}
          </button>
        </div>
      </div>
    </Col>
  );
};

export default TodoItem;
