const mongoose = require("mongoose");
const { TASK_CATEGORIES } = require("../constants");

const comboSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    bonus: {
        type: Number,
        default: 0
    },
    img: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        enum: Object.values(TASK_CATEGORIES),
        default: TASK_CATEGORIES.LIST
    },
    desc: {
        type: String,
        default: ""
    },
    profitPerHour: {
        type: Number,
        default: 0
    },    
    status: {
        type: String,
        enum: ['verified', 'denied'],
        default: 'pending'
    },
    created_at: {
        type: Date,
        default: ""
    }
});

const Combo = mongoose.model("Combo", comboSchema);
module.exports = Combo;