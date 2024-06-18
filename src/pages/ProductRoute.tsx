import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Nav from "../components/Nav";
import SideNav from "../components/SideNav";

const ProductRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  if (isAuthenticated) {
    return (
      <div className="flex flex-col h-screen">
        <Nav />
        <div className="flex flex-grow overflow-hidden">
          <SideNav onToggleCollapse={handleToggleCollapse} />
          <div className={`flex-grow overflow-auto transition-all p-2 duration-300`}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/auth?mode=login" />;
  }
};

export default ProductRoute;
