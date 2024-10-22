const mongoose = require("mongoose");
const { EXCHANGES, MINT_CATEGORIES, COMBO_TYPES } = require("../constants");

const lotterySchema = new mongoose.Schema({
    day: {
        type: Date,
        default: ""
    },
    participants: {
        type: Array,
        default: []
    },
    reward: {
        type: Number,
        default: 1000000
    },
    winner: {
        type: String,
        default: ""
    },
    claimed: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: ""
    }
});

const Lottery = mongoose.model("Lottery", lotterySchema);
module.exports = Lottery;