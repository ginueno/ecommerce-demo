import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getUser, register } from '../../state/Auth/Action';


const RegisterForm = () => {
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
            name: data.get("name"),
            email: data.get("email"),
            password: data.get("password")
        }

        dispatch(register(userData))

        console.log("userData ", userData)
        console.log(jwt);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField required id='name' name='name' label="Họ tên" fullWidth autoComplete='given-name' />
                    </Grid>
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
                            Đăng Ký
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <div className='flex justify-center flex-row items-center text-sm pt-3'>
                <p>Đã có tài khoản?</p>
                <a onClick={() => navigate("/login")}><p className='cursor-pointer pl-3 underline text-blue-500'>Đăng nhập &gt;</p></a>
            </div>

        </div>
    )
}

export default RegisterForm
