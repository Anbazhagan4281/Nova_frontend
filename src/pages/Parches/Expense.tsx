import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Add, Download } from "@mui/icons-material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { instance } from "../../axios";

const columns: GridColDef[] = [
	{ field: 'date', headerName: 'DATE', flex: 1 },
	{ field: 'account_name', headerName: 'EXPENSE ACCOUNT', flex: 1 },
	{ field: 'reference_number', headerName: 'REFERENCE NUMBER', flex: 1 },
	{ field: 'vendor', headerName: 'VENDAR NAME', flex: 1 },
	{ field: 'paid_through_account_name', headerName: 'PAID THROUGH', flex: 1 },
	{ field: 'customer_name', headerName: 'CUSTOMER NAME', flex: 1 },
	{ field: 'status', headerName: 'STATUS', flex: 1 },
	{ field: 'total', headerName: 'AMOUNT', flex: 1 },
];

const Expense: React.FC = () => {
	const [salesData, setSalesData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchSalesOrder = async () => {
			try {
				const response = await instance.get('expenses/');
				console.log(response);
				
				if (response.status === 200) {
					const dataWithIds = response.data.results.map((item, index) => ({
						...item,
						id: index + 1
					}));
					setSalesData(dataWithIds);
					setIsLoading(false);
				}
			} catch (error) {
				console.error('Error fetching sales orders:', error);
				setIsLoading(false);
			}
		};

		fetchSalesOrder();
	}, []);
	const downloadXl = async () => {
		try {
			const response = await instance.get('expences/export/', {
				responseType: 'blob'
			});

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'report.xlsx');
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<div className="px-3 w-full">
			<div className="flex justify-between items-center px-3 mb-3">
				<div className="text-xl">All Expences</div>
				<div className="flex">
					<Button startIcon={<Add />}>New</Button>
					<Button onClick={downloadXl} color="success" startIcon={<Download />}>Download</Button>
				</div>
			</div>
			<div className="w-full">
				{isLoading ? (
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
						<CircularProgress /> {/* Loader or spinner */}
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
									height: '40px', // Adjust the height of the header cells
								},
								'& .MuiDataGrid-columnHeaderTitle': {
									fontSize: '12px',
								},
								'& .MuiDataGrid-cell': {
									padding: '4px 8px',
									fontSize: '12px',
									height: '32px', // Adjust the height of the rows
									lineHeight: 'unset',
								},
								'& .MuiDataGrid-root': {
									fontSize: '12px',
								},
								'& .MuiDataGrid-row': {
									maxHeight: '32px', // Adjust the max height of the rows
								},
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Expense;
