'use client'
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";



const DetalleProducto =()=>{
    
    const {id}=useParams();
    const [producto,setProducto]= useState({});
    const router = useRouter();
    const handleClick = () => {
        router.push("/principal");
    };

    const getProducto= async ()=>{
        try {
            const response = await axios.get(`http://localhost:8000/api/productos/${id}`,{withCredentials:true})
            const result =  await response.data;
            setProducto(result);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteProduct = async ()=>{
        try {
            const response = await axios.delete(`http://localhost:8000/api/productos/${id}`,{withCredentials:true})
            const result =  await response.data;
            console.log(result);
            router.push("/principal");
        } catch (error) {
            console.log(error);
        }
    
    }

    const logout = async ()=>{
        try {
            const response = await axios.delete("http://localhost:8000/api/user/session",{withCredentials:true});
            const result = await response.data;
            console.log(result);
            router.push("/")
        } catch (error) {
            if(error.response.status === 401){
                router.push("/")
            }
        }

    }

    useEffect(()=>{
        getProducto();
    },[])

    return(
        <Fragment>
                <Stack direction="row" spacing={2} sx={{justifyContent:"space-between"}}>
                    <Typography variant="h4">Tienda</Typography>
                    <Stack direction="row" spacing={2} sx={{alignItems:"center"}}>
                        <Button variant="contained" color="primary" onClick={handleClick}>Inicio</Button>
                        <Button variant="outlined" color="error" onClick={logout}>Cerrar session</Button>
                    </Stack>
                </Stack>
            <Divider />
        <Stack sx={{padding:2, bgcolor:"Highlight",alignItems:"center"}}>
            <Paper sx={{justifyContent:"center", width:"50%",padding:2}}>
                <Stack sx={{alignItems:"center"}}>
                    <Typography variant="h4">Detalles del producto</Typography>
                    <Typography variant="h5">Titulo: {producto.title}</Typography>
                    <Typography variant="h5">Precio: Gs. {producto.price}</Typography>
                    <Typography variant="h5">Descripcion: {producto.description}</Typography>
                    <Button sx={{alignItems:"center",justifyContent:"center", width:"16%"}} variant="contained" color="info" onClick={deleteProduct}>Contactar</Button>
                </Stack>
            </Paper>
        </Stack>
        </Fragment>
    );
}


export default DetalleProducto;