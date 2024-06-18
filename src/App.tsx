import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { RootState } from "./redux/store";
import { theme } from "./mui"; // Corrected spelling of 'theme'
import Login from "./pages/Login";
import ProductRoute from "./pages/ProductRoute";
import Home from "./pages/Home";
import SalesOrder from "./pages/Sales/SalesOrder";
import Invoice from "./pages/Sales/Invoice";
import Customers from "./pages/Sales/Customers";
import CreditNote from "./pages/Sales/CreditNote";
import Expense from "./pages/Parches/Expense";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/" element={<ProductRoute />}>
            <Route index element={<Home />} />
            <Route path="sales/*">
              <Route index element={<Navigate to="sales-order" />} />
              <Route path="sales-order" element={<SalesOrder />} />
              <Route path="invoice" element={<Invoice />} />
              <Route path="customers" element={<Customers />} />
              <Route path="credit-note" element={<CreditNote />} />
            </Route>
            <Route path="parches/*">
              <Route index element={<Navigate to="sales-order" />} />
              <Route path="expenses" element={<Expense />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
