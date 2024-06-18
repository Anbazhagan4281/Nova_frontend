import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Add, Download } from "@mui/icons-material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { instance } from "../../axios";

interface Customer {
	id: number;
	contact_name: string;
	company_name: string;
	reference_number: string;
	customer_name: string;
	unused_credits_receivable_amount: number;
	unused_credits_receivable_amount_bcy: number;
}

const columns: GridColDef[] = [
	{ field: 'contact_name', headerName: 'NAME', flex: 1 },
	{ field: 'company_name', headerName: 'COMPANY NAME', flex: 1 },
	{ field: 'reference_number', headerName: 'EMAIL', flex: 1 },
	{ field: 'customer_name', headerName: 'WORK PHONE', flex: 1 },
	{ field: 'unused_credits_receivable_amount', headerName: 'RECEIVABLES (BCY)', flex: 1 },
	{ field: 'unused_credits_receivable_amount_bcy', headerName: 'UNUSED CREDITS (BCY)', flex: 1 },
];

const Customers: React.FC = () => {
	const [salesData, setSalesData] = useState<Customer[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchSalesOrder = async () => {
			try {
				const response = await instance.get('contacts/');
				if (response.status === 200) {
					const dataWithDefaults = response.data.results.map((item: any, index: number) => ({
						...item,
						id: index + 1,
						amount: item.amount || 0.0,
						balance: item.balance || 0.0
					})) as Customer[];
					setSalesData(dataWithDefaults);
				}
			} catch (error) {
				console.error('Error fetching customers:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSalesOrder();
	}, []);

	const downloadXl = async () => {
		try {
			const response = await instance.get('contacts/export/', {
				responseType: 'blob'
			});

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'customers.xlsx');
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (err) {
			console.error('Error downloading file:', err);
		}
	}

	return (
		<div className="px-3 w-full">
			<div className="flex justify-between items-center px-3 mb-3">
				<div className="text-xl">Active Customers</div>
				<div className="flex">
					<Button startIcon={<Add />}>New</Button>
					<Button onClick={downloadXl} color="success" startIcon={<Download />}>Download</Button>
				</div>
			</div>
			<div className="w-full">
				{isLoading ? (
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
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

export default Customers;
