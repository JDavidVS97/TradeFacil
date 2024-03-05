require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = 8000;

require('./config/mongoose.config');
app.use(cookieParser());

app.use(cors({
    credentials:true,
    origin:["http://localhost:3000"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const userRoutes = require('./routes/user.route');
app.use("/api/user", userRoutes); 

const productoRoutes = require('./routes/producto.routes');
app.use("/api/productos",productoRoutes);

const userIdRoutes = require('./routes/user.id.route');
app.use("/api/userid", userIdRoutes); 


app.listen(port, () => console.log(`Listening on port: ${port}`));