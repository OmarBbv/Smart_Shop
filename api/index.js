import express from "express";
import bodyParser from 'body-parser';
import { connectDB } from "./configs/connectDB.js";
import authRouter from './routers/autRouter.js';
import productRouter from './routers/productRouter.js';
import categoryRouter from "./routers/categoryRouter.js";
import userRouter from "./routers/userRouter.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { seedCategories } from "./seed/seedCategories.js";
import wishListRouter from "./routers/wishlistRouter.js";
import heroRouter from "./routers/heroRouter.js";
import seedProductsData from "./seed/seedProducts.js";
import seedUsersData from "./seed/seedsUser.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 4000;

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/wishlist', wishListRouter);
app.use('/api/v1/heros', heroRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

async function startApp() {
    try {
        await connectDB();

        await seedCategories();
        // await seedProductsData();
        await seedUsersData();

        app.listen(PORT, () => {
            console.log(`✅ Server ${PORT} portunda çalışıyor`);
        });
    } catch (error) {
        console.error('❌ Uygulama başlatma hatası:', error);
        process.exit(1);
    }
}

startApp();