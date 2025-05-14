import express from "express";
import { connectDB } from "./configs/connectDB.js";
import authRouter from './routers/autRouter.js';
import productRouter from './routers/productRouter.js';
import categoryRouter from "./routers/categoryRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 4000;
connectDB();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
});
