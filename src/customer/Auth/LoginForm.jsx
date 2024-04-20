import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getUser, login } from '../../state/Auth/Action';


const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")
    const auth = useSelector(store => store)
    useEffect(() => {
        console.log(jwt)
        if (jwt) {
            dispatch(getUser(jwt))
        }
    }, [jwt])
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const userData = {
            email: data.get("email"),
            password: data.get("password")
        }

        dispatch(login(userData))

        console.log("userData ", userData)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField required id='email' name='email' label="Email" fullWidth autoComplete='email' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required id='password' name='password' label="Mật khẩu" fullWidth autoComplete='password' />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            className='w-full'
                            variant='contained'
                            type='submit'
                            size='large'
                            sx={{ padding: ".8rem 0" }}>
                            Đăng nhập
                        </Button>
                    </Grid>
                </Grid>
                <div className='flex justify-center flex-row items-center text-sm pt-3'>
                    <p>Chưa có tài khoản?</p>
                    <a onClick={() => navigate("/register")}><p className='cursor-pointer pl-3 underline text-blue-500'>Đăng ký &gt;</p></a>
                </div>
            </form>

        </div>
    )
}

export default LoginForm
