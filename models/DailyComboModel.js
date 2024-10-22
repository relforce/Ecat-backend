const mongoose = require("mongoose");
const { EXCHANGES, MINT_CATEGORIES } = require("../constants");

const dailyComboSchema = new mongoose.Schema({
    day: {
        type: Date,
        default: ""
    },
    combo_id1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Combo'
    },
    combo_id2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Combo'
    },
    combo_id3: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Combo'
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

const DailyCombo = mongoose.model("DailyCombo", dailyComboSchema);
module.exports = DailyCombo;