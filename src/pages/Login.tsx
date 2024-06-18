import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    FormGroup,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import { FacebookRounded, LinkedIn, Google } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { register } from '../redux/actions/registerAction';
import { AppDispatch, RootState } from '../redux/store';
import { ErrorIcon, SuccessIcon } from '../components/Icons';
import ModelContainer from '../components/ModelContainer';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Credentials {
    username?: string;
    phone?: string;
    email: string;
    password: string;
}

interface Error {
    username?: string;
    email?: string;
    password?: string;
    phone?: string;
}

const initialState: Credentials = {
    username: '',
    phone: '',
    email: '',
    password: ''
};

const Login: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const mode = searchParams.get('mode') || 'login';
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const { username, isAuthenticated, loginLoading, loginError } = useSelector((state: RootState) => state.auth);
    const { registerError, registerAuth, registerLoading } = useSelector((state: RootState) => state.register) || {};

    const [credentials, setCredentials] = useState<Credentials>(initialState);
    const [error, setError] = useState<Error>({});
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

    useEffect(() => {
        setError(registerError || {});
    }, [registerError]);

    useEffect(() => {
        if (registerAuth && mode === 'signUp') {
            setModalContent(<SuccessIcon title={`Welcome, ${credentials.username}`} />);
            setIsOpen(true);
            setTimeout(() => {
                setIsOpen(false);
                navigate('/');
            }, 1500);
        }
    }, [credentials.username, navigate, registerAuth, mode]);

    useEffect(() => {
        setError(loginError || {});
    }, [loginError]);

    useEffect(() => {
        if (isAuthenticated) {
            setModalContent(<SuccessIcon title={`Welcome, ${username}`} />);
            setIsOpen(true);
            setTimeout(() => {
                setIsOpen(false);
                navigate('/');
            }, 1500);
        } else if (loginError) {
            setModalContent(<ErrorIcon title={loginError} />);
            setIsOpen(true);
        }
    }, [isAuthenticated, loginError, navigate, username]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const validate = () => {
        const tempError: Error = {};

        if (!/\S+@\S+\.\S+/.test(credentials.email)) {
            tempError.email = 'Email is not valid';
        } else if (/\s/.test(credentials.email)) {
            tempError.email = 'Email cannot contain spaces';
        }

        if (credentials.password.length < 8) {
            tempError.password = 'Password must be at least 8 characters';
        }

        setError(tempError);
        return Object.keys(tempError).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            if (mode === 'login') {
                dispatch(login(credentials));
            } else {
                dispatch(register(credentials));
            }
        }
    };

    const toggleMode = () => {
        setSearchParams({ mode: mode === 'login' ? 'signUp' : 'login' });
        setCredentials(initialState);
        setError({});
    };

    return (
        <div className='h-screen flex items-center'>
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent='center'
                    className='h-full'
                >
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* Adjusted background image container */}
                        <div className="h-[210px] md:h-[600px] sm:h-[400px] xs:h-[300px] w-auto bg-[url('public/assets/login.jpg')] rounded-lg bg-cover bg-center"></div>
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className='text-center'>
                            <div className='flex justify-center gap-4'>
                                {/* Adjusted logo import and alt text */}
                                <img src="public/assets/logo2.png" height={100} width={150} alt="Logo" />
                            </div>
                            <div className='font-extrabold'>{mode === 'login' ? 'Login to your Account' : 'Create an Account'}</div>
                            <div className='flex justify-center items-center'>
                                <div className='text-xs text-gray-500 py-2'>{mode === 'login' ? 'Login' : 'Sign Up'}</div>
                            </div>
                            <Box component='form' onSubmit={handleSubmit} sx={{ width: 400, maxWidth: '100%' }}>
                                {mode === 'signUp' && (
                                    <>
                                        <TextField name='username' onChange={handleChange} error={!!error.username} helperText={error.username} required size='small' fullWidth id='outlined-basics' label="Username" variant='outlined' margin='dense' />
                                        <TextField name='phone' onChange={handleChange} error={!!error.phone} helperText={error.phone || ''} required size='small' fullWidth id='outlined-basics' label="Phone Number" variant='outlined' margin='dense' />
                                    </>
                                )}
                                <TextField name='email' onChange={handleChange} error={!!error.email} helperText={error.email} required size='small' fullWidth id='outlined-basics' label="Email" variant='outlined' margin='dense' />
                                <TextField name='password' onChange={handleChange} error={!!error.password} helperText={error.password} required size='small' fullWidth id='outlined-basics' label="Password" type='password' variant='outlined' margin='dense' />
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label={<Typography className="text-">Remember my preference</Typography>}
                                        className="text-stone-600 font-bold"
                                    />
                                </FormGroup>
                                <Box sx={{ width: 400, maxWidth: '100%' }}>
                                    <Button fullWidth variant='contained' type='submit' color='darkblue'>
                                        {loginLoading || registerLoading ? <CircularProgress size={24} color='inherit' /> : mode === 'login' ? 'Login' : 'Sign Up'}
                                    </Button>
                                </Box>
                                <div className='py-2'>
                                    <div className='text-xs text-gray-500'>Continue with</div>
                                </div>
                                <Grid justifyContent='center' container spacing={1}>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <Button color='gray' fullWidth variant='outlined' startIcon={<FacebookRounded sx={{ color: '#3b579d' }} />}>Facebook</Button>
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={4} xs={6}>
                                        <Button color='gray' fullWidth variant='outlined' startIcon={<Google sx={{ color: '#d54c41' }} />}>Google</Button>
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={4} xs={12}>
                                        <Button color='gray' fullWidth variant='outlined' startIcon={<LinkedIn sx={{ color: '#3b579d' }} />}>LinkedIn</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                            <div className='text-xs py-4'>{mode === 'login' ? "Don't have an account?" : 'Already have an account?'} <span className='text-[#fc8019] cursor-pointer' onClick={toggleMode}>{mode === 'login' ? 'Sign Up' : 'Login'}</span></div>
                        </div>
                    </Grid>
                </Grid>
                <ModelContainer isOpen={isOpen}>
                    {modalContent}
                </ModelContainer>
            </Container>
        </div>
    );
};

export default Login;

