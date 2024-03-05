'use client'
import { Fragment, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {

const [title,setTitle]=useState("");
const [price,setPrice]=useState(0);
const [description,setDescription]=useState("");

const router = useRouter();
const handleClick = () => {
    router.push("/principal");
};

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

const handleCreateProducto=async(e)=>{



    e.preventDefault();
    const data={
        title,
        price,
        description,
    }
    console.log(data);
    try {
        const response = await axios.post("http://localhost:8000/api/productos",data,{withCredentials:true});
        const result = await response.data;
        setTitle("");
        setPrice(0);
        setDescription("");
        console.log(result);
        handleClick();
    } catch (error) {
        console.log(error);
    }
};

return (
    <Stack>
                <Stack direction="row" spacing={2} sx={{justifyContent:"space-between"}}>
                    <Typography variant="h4">Tienda</Typography>
                    <Stack direction="row" spacing={2} sx={{alignItems:"center"}}>
                        <Button variant="contained" color="primary" onClick={handleClick}>Inicio</Button>
                        <Button variant="outlined" color="error" onClick={logout}>Cerrar session</Button>
                    </Stack>
                </Stack>
                <Divider />
    <Stack sx={{justifyContent:'center',alignItems:"center"}}>
        <Paper sx={{padding:2,width:"30%", margin:"20px"}}>
            <Stack direction={"column"} spacing={2} sx={{alignItems:"center",justifyContent:"center"}}>
            <Typography variant="h5">Crear Oferta</Typography>
                <TextField 
                        label="Title"
                        name="Title" 
                        value={title} 
                        onChange={(e)=>setTitle(e.target.value)}
                />
                <TextField 
                        label="price"
                        name="price" 
                        value={price} 
                        onChange={(e)=>setPrice(e.target.value)}
                />
                <TextField 
                        label="Description"
                        name="Description" 
                        value={description} 
                        onChange={(e)=>setDescription(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleCreateProducto} >Crear</Button>
            </Stack>
        </Paper>
    </Stack>
    </Stack>
    
);
}
