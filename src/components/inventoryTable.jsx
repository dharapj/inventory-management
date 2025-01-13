import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disableProduct, deleteProduct, editProduct } from '../redux/inventorySlice';
import EditProductModal from "./editProductModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faEye, faEyeSlash, faTrash } from "@fortawesome/free-solid-svg-icons";
import { formatValue, sanitizePrice } from "../utils";

const InventoryTable = () => {
  const dispatch = useDispatch();

  const inventory = useSelector((state) => state.inventory.data);
  const isAdmin = useSelector((state) => state.inventory.isAdmin);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [disabledProducts, setDisabledProducts] = useState(new Set());

  // Handlers for actions
  const handleEdit = (product) => setSelectedProduct(product);

  const handleDelete = (id) => dispatch(deleteProduct(id));

  // Handle disabling and enabling a product
  const handleDisable = (product, disable) => {
    dispatch(disableProduct({ name: product.name, disable }));
  };

  const handleSave = (updatedProduct) => {
    dispatch(editProduct({ name: selectedProduct.name, updatedProduct }));
    setSelectedProduct(null);
  };

  const toggleView = (product) => {
    setViewingProduct((prev) => (prev?.name === product.name ? null : product));

    setDisabledProducts((prev) => {
      const updated = new Set(prev);
      if (updated.has(product.name)) {
        updated.delete(product.name); // Enable product
        handleDisable(product, false);
      } else {
        updated.add(product.name); // Disable product
        handleDisable(product, true);
      }
      return updated;
    });
  };

  return (
    <div className={isAdmin ? "table-container": "table-container disabled-table"}>
      <table>
        <thead>
          <tr>
            <th>
              <div>Name</div>
            </th>
            <th>
              <div>Category</div>
            </th>
            <th>
              <div>Price</div>
            </th>
            <th>
              <div>Quantity</div>
            </th>
            <th>
              <div>Value</div>
            </th>
            <th>
              <div>Actions</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr
              key={item.name}
              className={disabledProducts.has(item.name) ? "disabled" : ""}
            >
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                ${
                  formatValue(
                    sanitizePrice(item.price || 0) * (item.quantity || 0)
                  )
                }
              </td>
              <td>
                <FontAwesomeIcon
                  style={{
                    marginRight: "10px",
                    cursor: isAdmin && !disabledProducts.has(item.name) ? "pointer" : "not-allowed",
                    opacity: isAdmin && !disabledProducts.has(item.name) ? 1 : 0.5,
                    color: isAdmin && !disabledProducts.has(item.name) ? "green" : "white",
                  }}
                  icon={faPen}
                  onClick={() =>
                    isAdmin && !disabledProducts.has(item.name) && handleEdit(item)
                  }
                />
                <FontAwesomeIcon
                  style={{
                    marginRight: "10px",
                    cursor: isAdmin ? "pointer" : "not-allowed",
                    color: isAdmin ? "purple" : "white",
                  }}
                  icon={
                    disabledProducts.has(item.name) ? faEyeSlash : faEye
                  }
                  onClick={() => isAdmin && toggleView(item)}
                />
                <FontAwesomeIcon
                  style={{
                    marginRight: "10px",
                    cursor: isAdmin ? "pointer" : "not-allowed",
                    color: isAdmin ? "red" : "white",
                  }}
                  icon={faTrash}
                  onClick={() => isAdmin && handleDelete(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onSave={handleSave}
          onCancel={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default InventoryTable;
