import React from "react";
import { useSelector } from "react-redux";
import { selectSummary } from "../redux/inventorySlice";
import { Card, Row, Col } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { MdCategory, MdRemoveShoppingCart } from "react-icons/md";
import { RiExchangeDollarFill } from "react-icons/ri";
import { formatValue } from "../utils";


const InventorySummary = () => {
  const { totalProducts, totalStoreValue, outOfStock, categories } = useSelector(selectSummary);

  return (
    <Row className="mb-4 summary-widget">
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>
              <FaShoppingCart className="me-2" /> Total Products
            </Card.Title>
            <Card.Text>{totalProducts}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>
              <RiExchangeDollarFill className="me-2"/>Total Store Value</Card.Title>
            <Card.Text>{formatValue(totalStoreValue)}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title><MdRemoveShoppingCart className="me-2" />Out of Stock</Card.Title>
            <Card.Text>{outOfStock}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title><MdCategory className="me-2" />Categories</Card.Title>
            <Card.Text>{categories}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default InventorySummary;
