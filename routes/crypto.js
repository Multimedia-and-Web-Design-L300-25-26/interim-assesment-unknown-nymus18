import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';
import Crypto from '../models/Crypto.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const crypto = await Crypto.find({});
        res.json(crypto);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching crypto', error: error.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const { name, symbol, price, image, change24h } = req.body;
        if (!name || !symbol || !price || !image || change24h === undefined) return res.status(400).json({ message: "All fields are required" });

        const newCrypto = new Crypto({ name, symbol, price, image, change24h });
        await newCrypto.save();

        return res.json({
            message: "Crypto created succesfully",
            crypto: {
                name,
                symbol,
                price,
                image,
                change24h
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating crypto", error: error.message });
    }
})

router.get('/gainers', async (req, res) => {
    try {
        const cryptocurrencies = await Crypto.find({});

        const gainers = cryptocurrencies.map(crypto => {
            return {
                name: crypto.name,
                symbol: crypto.symbol,
                price: crypto.price,
                image: crypto.image,
                change24h: crypto.change24h
            };
        });

        gainers.sort((a, b) => b.change24h - a.change24h);

        res.json(gainers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching top gainers', error: error.message });
    }
})

router.get('/new', async (req, res) => {
    try {
        const crypto = await Crypto.find({});
        crypto.sort((a, b) => b.createdAt - a.createdAt);

        res.json(crypto);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching newest Cryptos', error: error.message });
    }
})

export default router;