const mongoose = require("mongoose");
const { EXCHANGES, MINT_CATEGORIES, COMBO_TYPES, COMBO_SIDE } = require("../constants");

const comboSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    img: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        enum: Object.values(COMBO_TYPES),
        default: COMBO_TYPES.MINE
    },
    side: {
        type: String,
        enum: Object.values(COMBO_SIDE),
        default: COMBO_SIDE.POSITIVE
    },
    category: {
        type: String,
        enum: Object.values(MINT_CATEGORIES),
        default: MINT_CATEGORIES.STUDENT
    },
    desc: {
        type: String,
        default: ""
    },
    profitPerHour: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    },
    data: {
        type: Object,
        default: {}
    },
    point: {
        type: Number,
        default: 0
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

const Combo = mongoose.model("Combo", comboSchema);
module.exports = Combo;