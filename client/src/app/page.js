import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";
import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";


export default function Home() {
  return (
    <main>
            <Stack marginBottom={2} direction="row" spacing={2} sx={{justifyContent:"space-between"}}>
                    <Typography variant="h4">Tienda</Typography>
                </Stack>
            <Divider />
      <Grid container columnSpacing={2}>
        <Grid item sm={6}>
          <LoginForm/>
          <Link href={"/registro"}>Aun no me registre</Link>
        </Grid>
        <Grid item sm={6}>
          {/* <RegisterForm/> */}
        </Grid>
      </Grid>


    </main>
  );
}
