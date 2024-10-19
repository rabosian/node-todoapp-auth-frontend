import React, { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const TodoPage = ({ setUser }) => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleCloseLogoutModal = () => setShowLogoutModal(false);
  const handleShowLogoutModal = () => setShowLogoutModal(true);

  const navigate = useNavigate();

  const getTasks = async () => {
    const response = await api.get("/tasks");
    setTodoList(response.data.data);
  };

  const addTodo = async () => {
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 200) {
        getTasks();
      }
      setTodoValue("");
    } catch (error) {
      console.log("error:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      console.log(id);
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const response = await api.put(`/tasks/${id}/status`);
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const sortItems = () => {
    if (isSorted) {
      // already sorted
      setIsSorted(false);
      getTasks();
    } else {
      const sortedList = [...todoList].sort(
        (a, b) => Number(a.isComplete) - Number(b.isComplete)
      );
      setTodoList(sortedList);
      setIsSorted(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Modal show={showLogoutModal}>
        <Modal.Header>
          <Modal.Title>Logout?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogoutModal}>Close</Button>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Modal.Footer>
      </Modal>

      <button className="button-logout" onClick={handleShowLogoutModal}>
        Logout
      </button>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            onChange={(event) => setTodoValue(event.target.value)}
            className="input-box"
            value={todoValue}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button onClick={addTodo} className="button-add">
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        sortItems={sortItems}
        isSorted={isSorted}
        deleteItem={deleteItem}
        toggleComplete={toggleComplete}
      />
    </Container>
  );
};

export default TodoPage;
