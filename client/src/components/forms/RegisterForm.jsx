'use client'
import { Button, Paper, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { useRouter } from "next/navigation";

const { Fragment, useState } = require("react");



const RegisterForm = ()=>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const [errors,setErrors] = useState({});

    const router = useRouter();

    const handleRegister = async()=>{

        try {
            const data ={
                email,
                password,
                confirmPassword
            }
            const response = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/user`,data);
            const result = await response.data;
            console.log(result);
            setErrors({});
            console.log("Redireccionando a la página de inicio");
            router.push("/")
        } catch (error) {
            console.log(error.response?.data?.errors);
            setErrors(error.response?.data?.errors);
        }

    }

    return(
        <Fragment>
            <Paper sx={{padding:2}}>
                <Stack direction={"column"} spacing={2} alignItems={"flex-start"}>
                    <Typography variant="h5">Registro</Typography>
                    <TextField 
                        label="email"
                        name="email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}
                        error={Boolean(errors?.email)}
                        helperText={errors?.email?.message}
                        />
                    <TextField 
                        label="password" 
                        name="password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                        error={Boolean(errors?.password)}
                        helperText={errors?.password?.message}
                        autoComplete="false"
                        />
                    <TextField 
                        label="confirmPassword" 
                        name="confirmPassword" 
                        value={confirmPassword} 
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        error={Boolean(errors?.confirmPassword)}
                        helperText={errors?.confirmPassword?.message}
                        autoComplete="false"
                        />
                    <Button variant="contained" color="primary" onClick={handleRegister} >Crear</Button>
                </Stack>
            </Paper>
        </Fragment>
    );
}

export default RegisterForm;