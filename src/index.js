import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authentication from '../routes/authentication.js';
import crypto from '../routes/crypto.js';

dotenv.config();

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173', 'https://felixasante-crypto-app.netlify.app'],
    credentials: true
}))



app.use('/', authentication)
app.use('/crypto', crypto)


const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully');
        console.log(`Server running at http://localhost:${PORT}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
});

process.stdin.resume();
