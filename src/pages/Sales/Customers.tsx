import React, { useEffect, useState } from "react";
import {
    Button,
    CircularProgress,
    FormControlLabel,
    FormLabel,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import { Add, Download } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { instance } from "../../axios";
import { IconX } from "@tabler/icons-react";

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
    const [create, setCreate] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        customerType: "Business",
        salutation: "",
        firstName: "",
        lastName: "",
        company_name: "",
        displayName: "",
        email: "",
        workPhone: "",
        mobile: "",
        pan: "",
        currency: "",
        contact_id: "",
        contact_name: "",
        contact_type: "",
        outstanding_receivable_amount: "",
        outstanding_receivable_amount_bcy: "",
        status: "",
        unused_credits_receivable_amount: "",
        unused_credits_receivable_amount_bcy: "",
    });

    const fetchSalesOrder = async () => {
        try {
            const response = await instance.get('contacts/');
            if (response.status === 200) {
                const dataWithDefaults = response.data.results.map((item: any, index: number) => ({
                    ...item,
                    id: index + 1,
                    amount: item.amount || 0.0,
                    balance: item.balance || 0.0,
                })) as Customer[];
                setSalesData(dataWithDefaults);
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSalesOrder();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

        const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Mobile number validation
        if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors['mobile'] = 'Mobile should be exactly 10 digits.';
        }
        
        // Work phone number validation
        if (!/^\d{10}$/.test(formData.workPhone)) {
            newErrors['workPhone'] = 'Work Phone should be exactly 10 digits.';
        }

        // Email validation
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            newErrors['email'] = 'Invalid email address.';
        }

        // Required fields validation
        Object.keys(formData).forEach((field) => {
            if (!formData[field as keyof typeof formData]) {
                newErrors[field] = "This field is required.";
            }
        });
	}

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submission initiated.");
        
        if (!validateForm()) {
            return;
        }
        
        const newFormData = {
            ...formData,
            created_time: new Date().toISOString(),
            last_modified_time: new Date().toISOString(),
            user: 1,
        };

        console.log("Prepared data for submission:", newFormData);
        
        try {
            const response = await instance.post('contacts/', newFormData);
            console.log("API response:", response);
            
            if (response.status === 201) {
                console.log("Customer created successfully:", response);
                setCreate(false);
                fetchSalesOrder();
            }
        } catch (error) {
            console.error('Error creating customer:', error);
        }
    };

    const downloadXl = async () => {
        try {
            const response = await instance.get('contacts/export/', {
                responseType: 'blob',
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
    };

    return (
        <div className="px-3 w-full">
            {!create ? (
                <div>
                    <div className="flex justify-between items-center px-3 mb-3">
                        <div className="text-xl">Active Customers</div>
                        <div className="flex gap-2">
                            <Button onClick={() => setCreate(true)} startIcon={<Add />}>
                                New
                            </Button>
                            <Button onClick={downloadXl} color="success" startIcon={<Download />}>
                                Download
                            </Button>
                        </div>
                    </div>
                    <div className="w-full">
                        {isLoading ? (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minHeight: '400px',
                                }}
                            >
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
            ) : (
                <div>
                    <div className="p-2 flex justify-between">
                        <div>New Customer</div>
                        <IconButton color="error" onClick={() => setCreate(false)}>
                            <IconX />
                        </IconButton>
                    </div>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <FormLabel>Customer Type</FormLabel>
                        <RadioGroup
                            row
                            name="customerType"
                            value={formData.customerType}
                            onChange={handleInputChange}
                        >
                            <FormControlLabel
                                value="Business"
                                control={<Radio sx={{ fontSize: '12px' }} className="text-sm" />}
                                label="Business"
                            />
                            <FormControlLabel
                                value="Individual"
                                control={<Radio sx={{ fontSize: '12px' }} className="text-sm" />}
                                label="Individual"
                            />
                        </RadioGroup>

                        <div>Primary Contact</div>
                        <div className="flex flex-wrap gap-2">
                            <TextField
                                name="salutation"
                                label="Salutation"
                                value={formData.salutation}
                                onChange={handleInputChange}
                                margin="dense"
                                size="small"
                                error={!!errors.salutation}
                                helperText={errors.salutation}
                            />
                            <TextField
                                name="firstName"
                                label="First Name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                margin="dense"
                                size="small"
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                            />
                            <TextField
                                name="lastName"
                                label="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                margin="dense"
                                size="small"
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <TextField
                                name="company_name"
                                label="Company Name"
                                value={formData.company_name}
                                onChange={handleInputChange}
                                margin="dense"
                                size="small"
                                error={!!errors.company_name}
                                helperText={errors.company_name}
                            />
                            <TextField
                                name="displayName"
                                label="Customer Display Name"
                                value={formData.displayName}
                                onChange={handleInputChange}
                                margin="dense"
                                size="small"
                                error={!!errors.displayName}
                                helperText={errors.displayName}
                            />
                            <TextField
                                name="email"
                                label="Customer Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                margin="dense"
                                size="small"
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <TextField
                                name="workPhone"
                                label="Work Phone"
                                value={formData.workPhone}
                                onChange={handleInputChange}
                                margin="dense"
                                size="small"
                                error={!!errors.workPhone}
                                helperText={errors.workPhone}
                            />
                            <TextField
                                name="mobile"
                                label="Mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                margin="dense"
                                size="small"
                                error={!!errors.mobile}
                                helperText={errors.mobile}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <TextField
                                name="pan"
                                label="PAN"
                                value={formData.pan}
                                onChange={handleInputChange}
                                margin="dense"
                                size="small"
                                error={!!errors.pan}
                                helperText={errors.pan}
                            />
                            <TextField
                                name="currency"
                                label="Currency"
                                value={formData.currency}
                                onChange={handleInputChange}
                                margin="dense"
                                size="small"
                                error={!!errors.currency}
                                helperText={errors.currency}
                            />
                        </div>
                        {/* Additional required fields */}
                        <TextField
                            name="contact_id"
                            label="Contact ID"
                            value={formData.contact_id}
                            onChange={handleInputChange}
                            margin="dense"
                            size="small"
                            error={!!errors.contact_id}
                            helperText={errors.contact_id}
                        />
                        <TextField
                            name="contact_name"
                            label="Contact Name"
                            value={formData.contact_name}
                            onChange={handleInputChange}
                            margin="dense"
                            size="small"
                            error={!!errors.contact_name}
                            helperText={errors.contact_name}
                        />
                        <TextField
                            name="contact_type"
                            label="Contact Type"
                            value={formData.contact_type}
                            onChange={handleInputChange}
                            margin="dense"
                            size="small"
                            error={!!errors.contact_type}
                            helperText={errors.contact_type}
                        />
                        <TextField
                            name="outstanding_receivable_amount"
                            label="Outstanding Receivable Amount"
                            value={formData.outstanding_receivable_amount}
                            onChange={handleInputChange}
                            margin="dense"
                            size="small"
                            error={!!errors.outstanding_receivable_amount}
                            helperText={errors.outstanding_receivable_amount}
                        />
                        <TextField
                            name="outstanding_receivable_amount_bcy"
                            label="Outstanding Receivable Amount (BCY)"
                            value={formData.outstanding_receivable_amount_bcy}
                            onChange={handleInputChange}
                            margin="dense"
                            size="small"
                            error={!!errors.outstanding_receivable_amount_bcy}
                            helperText={errors.outstanding_receivable_amount_bcy}
                        />
                        <TextField
                            name="status"
                            label="Status"
                            value={formData.status}
                            onChange={handleInputChange}
                            margin="dense"
                            size="small"
                            error={!!errors.status}
                            helperText={errors.status}
                        />
                        <TextField
                            name="unused_credits_receivable_amount"
                            label="Unused Credits Receivable Amount"
                            value={formData.unused_credits_receivable_amount}
                            onChange={handleInputChange}
                            margin="dense"
                            size="small"
                            error={!!errors.unused_credits_receivable_amount}
                            helperText={errors.unused_credits_receivable_amount}
                        />
                        <TextField
                            name="unused_credits_receivable_amount_bcy"
                            label="Unused Credits Receivable Amount (BCY)"
                            value={formData.unused_credits_receivable_amount_bcy}
                            onChange={handleInputChange}
                            margin="dense"
                            size="small"
                            error={!!errors.unused_credits_receivable_amount_bcy}
                            helperText={errors.unused_credits_receivable_amount_bcy}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Customers;
