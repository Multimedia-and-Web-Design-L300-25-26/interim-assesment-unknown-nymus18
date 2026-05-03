import mongoose from "mongoose";

const cryptoScheme = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        symbol: { type: String, required: true, trim: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        change24h: { type: Number, required: true }
    },
    { timestamps: true }
)
const Crypto = mongoose.model('Crypto', cryptoScheme);

export default Crypto;