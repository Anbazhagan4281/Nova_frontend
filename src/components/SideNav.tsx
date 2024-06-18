import React, { useState } from "react";
import { Collapse, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router-dom";
import { IconHome, IconPackage, IconShoppingBag, IconShoppingCart } from "@tabler/icons-react";

interface SideNavProps {
  onToggleCollapse: (collapsed: boolean) => void;
}

const menuItems = [
  { text: "Home", icon: <IconHome size="18" stroke={1} />, path: "/" },
];

const salesSubMenuItems = [
  { text: "Customers", path: "/sales/customers" },
  { text: "Sales Order", path: "/sales/sales-order" },
  { text: "Invoice", path: "/sales/invoice" },
  { text: "Credit Note", path: "/sales/credit-note" }
];

const parchesSubMenuItems = [
  { text: "Expenses", path: "/parches/expenses" }
];

const SideNav: React.FC<SideNavProps> = ({ onToggleCollapse }) => {
  const location = useLocation();
  const [openSales, setOpenSales] = useState(false);
  const [openParches, setOpenParches] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
    onToggleCollapse(!collapsed);
  };

  const handleToggleSales = () => setOpenSales(!openSales);
  const handleToggleParches = () => setOpenParches(!openParches);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`h-full bg-gray-200 text-black px-2 ${collapsed ? "w-14" : "w-48"} transition-all duration-300 flex flex-col`}>
      <div>
        <IconButton onClick={handleToggleCollapse} className="text-black">
          <MenuIcon fontSize="small" />
        </IconButton>
      </div>
      <div className="flex-grow overflow-y-auto">
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index} className={`flex items-center rounded-md p-2 transition-colors text-center ${isActive(item.path) ? "bg-blue-400 text-white" : "hover:bg-gray-300"} ${collapsed ? "justify-center" : "justify-start"}`}>
            <span>{item.icon}</span>
            {!collapsed && <span className="ml-4 text-sm">{item.text}</span>}
          </Link>
        ))}
        <div>
          <div className={`flex items-center p-2 rounded-md transition-colors duration-300 cursor-pointer ${isActive("/sales") ? "bg-blue-400" : "hover:bg-gray-300"} ${collapsed ? "justify-center" : "justify-start"}`} onClick={handleToggleSales}>
            <span className="flex-shrink-0"><IconShoppingCart size="18" stroke={1} /></span>
            {!collapsed && <span className="ml-4 text-sm">Sales</span>}
            {!collapsed && (openSales ? <ExpandLess /> : <ExpandMore />)}
          </div>
          <Collapse in={openSales} timeout="auto" unmountOnExit>
            <div className="pl-8">
              {salesSubMenuItems.map((item, index) => (
                <Link to={item.path} key={index} className={`flex items-center p-2 rounded-md transition-colors duration-300 ${isActive(item.path) ? "bg-blue-400 text-white" : "hover:bg-gray-300"} justify-start`}>
                  <span className="text-sm">{item.text}</span>
                </Link>
              ))}
            </div>
          </Collapse>
        </div>
        <div>
          <div className={`flex items-center p-2 rounded-md transition-colors duration-300 cursor-pointer ${isActive("/parches") ? "bg-blue-400" : "hover:bg-gray-300"} ${collapsed ? "justify-center" : "justify-start"}`} onClick={handleToggleParches}>
            <span className="flex-shrink-0"><IconPackage size="18" stroke={1} /></span>
            {!collapsed && <span className="ml-4 text-sm">Parches</span>}
            {!collapsed && (openParches ? <ExpandLess /> : <ExpandMore />)}
          </div>
          <Collapse in={openParches} timeout="auto" unmountOnExit>
            <div className="pl-8">
              {parchesSubMenuItems.map((item, index) => (
                <Link to={item.path} key={index} className={`flex items-center p-2 rounded-md transition-colors duration-300 ${isActive(item.path) ? "bg-blue-400 text-white" : "hover:bg-gray-300"} justify-start`}>
                  <span className="text-sm">{item.text}</span>
                </Link>
              ))}
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
