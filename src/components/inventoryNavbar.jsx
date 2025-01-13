import React from "react";
import { Navbar, Nav, Form, FormCheck, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleAdminView } from "../redux/inventorySlice";

const InventoryNavbar = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.inventory.isAdmin);

  const handleToggleView = () => {
    dispatch(toggleAdminView());
  };

//   const handleLogout = () => {
//     dispatch(logout());
//   };

  return (
    <Navbar variant="dark" expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="#">Inventory Stats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Form className="d-flex align-items-center me-3">
              <label className="text-light me-2">Admin</label>
              <FormCheck
                type="switch"
                id="admin-user-toggle"
                checked={!isAdmin}
                onChange={handleToggleView}
                className="text-light"
              /><label className="text-light me-2">User</label>
              
            </Form>
            <Button variant="outline-light" className="d-flex align-items-center">
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default InventoryNavbar;
