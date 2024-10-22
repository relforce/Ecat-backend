const mongoose = require("mongoose");
const { EXCHANGES, MINT_CATEGORIES } = require("../constants");

const dailyCipherSchema = new mongoose.Schema({
    day: {
        type: Date,
        default: ""
    },
    cipher: {
        type: String,
        default: 'alpha'
    },
    point: {
        type: Number,
        default: 1000000
    },
    limited_at: {
        type: Date,
        default: ""
    },
    status: {
        type: String,
        enum: ['verified', 'denied'],
        default: 'verified'
    },
    created_at: {
        type: Date,
        default: ""
    }
});

const DailyCipher = mongoose.model("DailyCipher", dailyCipherSchema);
module.exports = DailyCipher;