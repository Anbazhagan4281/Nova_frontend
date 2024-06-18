import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Add, Download } from "@mui/icons-material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { instance } from "../../axios";

interface SalesData {
	id: number;
	date: string;
	creditnote_number: string;
	reference_number: string;
	customer_name: string;
	invoice_id: string;
	status: string;
	total: number;
	balance: number;
}

const columns: GridColDef[] = [
	{ field: 'date', headerName: 'DATE', flex: 1 },
	{ field: 'creditnote_number', headerName: 'CREDIT NOTE#', flex: 1 },
	{ field: 'reference_number', headerName: 'REFERENCE NUMBER', flex: 1 },
	{ field: 'customer_name', headerName: 'CUSTOMER NAME', flex: 1 },
	{ field: 'invoice_id', headerName: 'INVOICE', flex: 1 },
	{ field: 'status', headerName: 'STATUS', flex: 1 },
	{ field: 'total', headerName: 'AMOUNT', flex: 1 },
	{ field: 'balance', headerName: 'BALANCE DUE', flex: 1 },
];

const CreditNote: React.FC = () => {
	const [salesData, setSalesData] = useState<SalesData[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchSalesOrder = async () => {
			try {
				const response = await instance.get('credit_note/');
				if (response.status === 200) {
					const dataWithIds: SalesData[] = response.data.results.map((item: any, index: number) => ({
						...item,
						id: index + 1
					}));
					setSalesData(dataWithIds);
				}
			} catch (error) {
				console.error('Error fetching credit notes:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSalesOrder();
	}, []);

	const downloadXl = async () => {
		try {
			const response = await instance.get('credit_note/export/', {
				responseType: 'blob'
			});

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'credit_note.xlsx');
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error('Error downloading file:', error);
		}
	}

	return (
		<div className="px-3 w-full">
			<div className="flex justify-between items-center px-3 mb-3">
				<div className="text-xl">All Credit Notes</div>
				<div className="flex">
					<Button startIcon={<Add />}>New</Button>
					<Button onClick={downloadXl} color="success" startIcon={<Download />}>Download</Button>
				</div>
			</div>
			<div className="w-full">
				{isLoading ? (
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
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

export default CreditNote;
