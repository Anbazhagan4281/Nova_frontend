import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { instance } from "../../axios";

interface InvoiceData {
	id: number;
	date: string;
	invoice_number: string;
	reference_number: string;
	customer_name: string;
	status: string;
	due_date: string;
	total: number;
	balance: number;
}

const columns: GridColDef[] = [
	{ field: 'date', headerName: 'DATE', flex: 1 },
	{ field: 'invoice_number', headerName: 'INVOICE#', flex: 1 },
	{ field: 'reference_number', headerName: 'ORDER NUMBER', flex: 1 },
	{ field: 'customer_name', headerName: 'CUSTOMER NAME', flex: 1 },
	{ field: 'status', headerName: 'STATUS', flex: 1 },
	{ field: 'due_date', headerName: 'DUE DATE', flex: 1 },
	{ field: 'total', headerName: 'AMOUNT', flex: 1 },
	{ field: 'balance', headerName: 'BALANCE DUE', flex: 1 },
];

const Invoice: React.FC = () => {
	const [salesData, setSalesData] = useState<InvoiceData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchSalesOrder = async () => {
			try {
				const response = await instance.get('invoice/');
				if (response.status === 200) {
					const dataWithIds = response.data.results.map((item: any, index: number) => ({
						...item,
						id: index + 1
					})) as InvoiceData[];
					setSalesData(dataWithIds);
				}
			} catch (error) {
				console.error('Error fetching invoices:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSalesOrder();
	}, []);

	return (
		<div className="px-3 w-full">
			<div className="flex justify-between items-center px-3 mb-3">
				<div className="text-xl">All Invoices</div>
				<div><Button startIcon={<Add />}>New</Button></div>
			</div>
			<div className="w-full">
				{isLoading ? (
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
						<CircularProgress />
					</div>
				) : (
					<div className="w-full">
						<DataGrid
							rows={salesData}
							columns={columns}
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
				)}
			</div>
		</div>
	);
};

export default Invoice;
