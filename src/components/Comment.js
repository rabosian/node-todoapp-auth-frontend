import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";

const Comment = ({ item, deleteComment }) => {

  return (
    <div>
      <Row>
        <Col>{item.contents}</Col>
        <Col>
          <FaRegTrashAlt onClick={() => deleteComment(item._id)} />
        </Col>
      </Row>
    </div>
  );
};

export default Comment;
