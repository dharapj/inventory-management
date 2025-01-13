import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { sanitizePrice } from "../utils";

const EditProductModal = ({ product, onSave, onCancel }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    category: product.category,
    price: product.price,
    quantity: product.quantity,
    value: product.value,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value.replace(/[^0-9.]/g, "")) || 0 : value, // Strip non-numeric characters
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    if (name === "price") {
      setUpdatedProduct((prev) => ({
        ...prev,
        price: parseFloat(prev.price).toFixed(2), // Ensure the price is formatted to 2 decimal places
      }));
    }
  };

  const handleSave = () => {
    onSave(updatedProduct);
  };

  return (
    <Modal show onHide={onCancel} centered>
      <Modal.Header closeButton>
      <Modal.Title>
          Edit product
          <span className='subtitle'>{updatedProduct.name}</span>
            </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="productCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={updatedProduct.category}
                  onChange={handleChange}
                  placeholder="Enter category"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="productPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  name="price"
                  value={`${sanitizePrice(updatedProduct.price)}`} // Add $ sign for display
                  onChange={handleChange}
                  onBlur={handleBlur} // Format on blur
                  placeholder="Enter price"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            
            <Col md={6}>
              <Form.Group controlId="productQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  min={0}
                  value={updatedProduct.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group controlId="productValue">
            <Form.Label>Value</Form.Label>
            <Form.Control
              type="text"
              name="value"
              value={`${(sanitizePrice(updatedProduct.price) * updatedProduct.quantity).toFixed(2)}`}
              readOnly
              disabled
            />
          </Form.Group>
            </Col>
          </Row>

          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductModal;
