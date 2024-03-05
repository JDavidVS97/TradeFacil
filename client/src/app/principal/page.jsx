'use client'
import { Button, Divider, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
const { Fragment, useState, useEffect } = require("react");
import axios from "axios";
import Link from "next/link";



const PrincipalPage = ()=>{

    const router = useRouter();
    const [productos,setProductos]=useState([]);
    
    const handleClick = () => {
        router.push("/create");
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

    const getProductos= async()=>{
        try {
            const response = await axios.get("http://localhost:8000/api/productos",{withCredentials:true});
            const result = await response.data;
            setProductos(result);
        } catch (error) {
            if(error.response.status === 401){
                router.push("/")
            }
        }

    }

    const deleteProduct = (id)=> async ()=>{
        try {
            const response = await axios.delete(`http://localhost:8000/api/productos/${id}`,{withCredentials:true})
            const result =  await response.data;
            console.log(result);
            // router.push("/productos");
            setProductos((prevVal)=>{
                const newList =prevVal.filter((item)=>item._id !== id);
                return([...newList]);
            })
        } catch (error) {
            console.log(error);
        }
    
    }

    useEffect(()=>{
        getProductos();
    },[]);



    return(
        <Fragment>
            <Stack direction="row" spacing={2} sx={{justifyContent:"space-between"}}>
                <Typography variant="h4">Tienda</Typography>
                <Stack direction="row" spacing={2} sx={{alignItems:"center"}}>
                    <Button variant="contained" color="primary" onClick={handleClick}>Crear oferta</Button>
                    <Button variant="outlined" color="error" onClick={logout}>Cerrar session</Button>
                </Stack>
            </Stack>
            <Divider />
            <Stack>
                <Typography variant="h5">Productos Disponibles</Typography>
                <List>
                    {productos.map((producto, index) => (
                        <ListItem key={`producto-${index}`}>
                        <Link style={{textDecoration:"none",color:"black"}} href={`/create/${producto._id}`} passHref>
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <img src={producto.imageUrl} alt={producto.title} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                        <ListItemText primary={producto.title} secondary={`Precio: Gs.${producto.price}`} />
                        </div>
                        </Link>
                        </ListItem>
                        ))}
                </List>
            </Stack>
        </Fragment>
    );
}

export default PrincipalPage;