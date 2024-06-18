import React, { useEffect, useState } from "react";
import { Alert, Autocomplete, Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { instance } from "../axios";
import ModelContainer from "./ModelContainer";

const ImportData: React.FC = () => {
	const [isLoading, setLoading] = useState<boolean>(false);
	const isOpen = useSelector((state: RootState) => state.store.importModel);
	const [formData, setFormData] = useState<{
		client_id: string | null;
		secret_code: string | null;
		user: number | null;
	}>({
		client_id: null,
		secret_code: null,
		user: localStorage.getItem('username') ? parseInt(localStorage.getItem('username')!) : null,
	});

	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			client_id: null,
			secret_code: null,
		}));
	}, [isOpen]);

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await instance.post('import/', formData);
			if (response.status === 200) {
				setLoading(false);
			}
		} catch (error) {
			console.error("Error:", error);
			setLoading(false);
		}
	};

	return (
		<div className="bg-red-400">
			<ModelContainer isOpen={isOpen}>
				<p className="text-xl p-2 font-medium">Import Form</p>
				<Alert severity="info" className="w-full">
					Go to the{' '}
					<a href="https://accounts.zoho.com/developerconsole" target="_blank" rel="noopener noreferrer" className="text-red-300">
						Zoho Developer Console
					</a>{' '}
					and log in with your Zoho Books email. Click on{' '}
					<span className="text-red-300">Server-based Applications</span>, set the Client Name to{' '}
					<span className="text-red-300">Export Data</span>, and set the Homepage URL to{' '}
					<span className="text-red-300">http://localhost</span>, which should be the same as the Authorized Redirect URI. Then click Create to obtain the Client ID and Client Secret.
				</Alert>
				<form className="w-full py-2" onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} xl={12}>
							<Autocomplete
								size="small"
								className="w-full"
								options={[{ label: 'Zoho Books' }]}
								renderInput={(params) => <TextField {...params} size="small" label="Import From" />}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								size="small"
								name="client_id"
								onChange={handleFormChange}
								className="w-full"
								required
								label="Client Id"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								size="small"
								name="secret_code"
								onChange={handleFormChange}
								className="w-full"
								required
								label="Client Secret"
							/>
						</Grid>
					</Grid>
					<div className="flex justify-end w-full p-2">
						<Button type="submit" variant="contained" color="primary">
							{isLoading ? <CircularProgress size={24} color="inherit" /> : 'Import'}
						</Button>
					</div>
				</form>
			</ModelContainer>
		</div>
	);
};

export default ImportData;
