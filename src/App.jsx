import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInventory, toggleAdminView } from "./redux/inventorySlice";
import axios from "axios";
import Widgets from "./Widgets";
import InventoryTable from "./components/inventoryTable";
import 'bootstrap/dist/css/bootstrap.min.css';
import InventorySummary from "./components/inventorySummary";
import InventoryNavbar from "./components/inventoryNavbar";

const App = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.inventory.isAdmin);

  useEffect(() => {
    axios
      .get("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory")
      .then((response) => dispatch(setInventory(response.data)))
      .catch((error) => console.error("Error fetching inventory data:", error));
  }, [dispatch]);

  return (
    <div className="app">
      <InventoryNavbar />
      <InventorySummary />
      <InventoryTable />
    </div>
  );
};

export default App;
