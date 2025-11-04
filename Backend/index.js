import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import { MongoConnection } from './utils/db.js';
import UserRoute from './Routes/User_Route.js'
import CompanyRoute from './Routes/Company_Route.js'
import JobRoute from './Routes/Job_Route.js'
import ApplicationRoute from './Routes/Application_Route.js'
import AiRoute from './Routes/Ai_Route.js'

dotenv.config({});
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));

// All Api's
app.use('/api/user', UserRoute);
app.use('/api/company', CompanyRoute);
app.use('/api/job', JobRoute);
app.use('/api/application', ApplicationRoute);
app.use('/ai/chat', AiRoute);

app.listen(3000, () => {
    MongoConnection();
    console.log("Server running on http://localhost:3000");
})