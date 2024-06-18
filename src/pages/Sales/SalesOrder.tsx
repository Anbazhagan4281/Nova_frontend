import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Add, Download } from "@mui/icons-material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { instance } from "../../axios";

interface SalesOrderData {
  id: number;
  date: string;
  salesorder_number: string;
  reference_number: string;
  customer_name: string;
  status: string;
  invoiced_status: string;
  paid_status: string;
  shipment_date: string;
  order_status: string;
  delivery_method: string;
  total: number;
  balance: number;
}

const columns: GridColDef[] = [
  { field: 'date', headerName: 'DATE', flex: 1},
  { field: 'salesorder_number', headerName: 'SALES ORDER#', flex: 1},
  { field: 'reference_number', headerName: 'REFERENCE#', flex: 1},
  { field: 'customer_name', headerName: 'CUSTOMER NAME', flex: 1},
  { field: 'status', headerName: 'STATUS', flex: 1},
  { field: 'invoiced_status', headerName: 'INVOICE', flex: 1},
  { field: 'paid_status', headerName: 'PAYMENT', flex: 1},
  { field: 'shipment_date', headerName: 'EXPECTED SHIPMENT DATE', flex: 1},
  { field: 'order_status', headerName: 'ORDER STATUS', flex: 1},
  { field: 'delivery_method', headerName: 'DELIVERY METHOD', flex: 1},
  { field: 'total', headerName: 'AMOUNT', flex: 1},
  { field: 'balance', headerName: 'BALANCE DUE', flex: 1},
];

const SalesOrder: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesOrderData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchSalesOrder = async () => {
      try {
        const response = await instance.get('sales_order/');
        if (response.status === 200) {
          const dataWithIds = response.data.results.map((item: any, index: number) => ({
            ...item,
            id: index + 1
          })) as SalesOrderData[];
          setSalesData(dataWithIds);
        }
      } catch (error) {
        console.error('Error fetching sales orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalesOrder();
  }, []);

  const downloadXl = async () => {
    try {
      const response = await instance.get('sales_order/export/', {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sales_orders.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.log(err);
    }
  }

  const visibleColumns = isMobile
    ? columns.filter(column => !column.hide)
    : columns;

  return (
    <div className="px-3 w-full">
      <div className="flex justify-between items-center px-3 mb-3">
        <div className="text-xl">All Sales Order</div>
        <div className="flex">
          <Button startIcon={<Add />}>New</Button>
          <Button onClick={downloadXl} color="success" startIcon={<Download />}>Download</Button>
        </div>
      </div>
      <div className="w-full">
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </div>
        ) : (
          <div className="w-full">
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <DataGrid
                rows={salesData}
                columns={visibleColumns}
                pageSize={5}
                checkboxSelection
                autoHeight
                disableColumnMenu
                disableColumnSelector
                sx={{
                  '& .MuiDataGrid-columnHeader': {
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    fontSize: '12px',
                    padding: '0 8px',
                    height: '40px',
                  },
                  '& .MuiDataGrid-columnHeaderTitle': {
                    fontSize: '12px',
                  },
                  '& .MuiDataGrid-cell': {
                    padding: '4px 8px',
                    fontSize: '12px',
                    height: '32px',
                    lineHeight: 'unset',
                  },
                  '& .MuiDataGrid-root': {
                    fontSize: '12px',
                  },
                  '& .MuiDataGrid-row': {
                    maxHeight: '32px',
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesOrder;
