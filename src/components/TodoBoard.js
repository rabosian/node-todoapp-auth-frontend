import React from "react";
import TodoItem from "./TodoItem";
import { Col, Row } from "react-bootstrap";

const TodoBoard = ({
  todoList,
  isSorted,
  sortItems,
  deleteItem,
  toggleComplete,
}) => {
  return (
    <div>
      <Row xs={12} sm={2} className="justify-content-center">
        <Col xs={12} sm={11}>
          <h2>To-do List</h2>
        </Col>
        {todoList.length > 0 && (
          <Col xs={6} sm={1}>
            <button className="button-sort" onClick={sortItems}>
              {isSorted ? "🔄 Reset" : "🔼 Sort"}
            </button>
          </Col>
        )}
      </Row>
      <Row>
        {todoList.length > 0 ? 
          (todoList.map((item) => (
            <TodoItem
              item={item}
              deleteItem={deleteItem}
              toggleComplete={toggleComplete}
            />
          ))) : <h2>There is no item to show</h2>}
      </Row>
    </div>
  );
};

export default TodoBoard;
