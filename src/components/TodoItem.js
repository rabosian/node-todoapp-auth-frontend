import React from "react";
import { Col } from "react-bootstrap";

const TodoItem = ({ item, deleteItem, toggleComplete }) => {
  return (
      <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
        <div className={`todo-item ${item.isComplete ? "item-complete" : ""}`}>
          <div className="todo-content">{item.taskName}</div>
          <div className="todo-content">{item.author && "by " + item.author.name}</div>
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
