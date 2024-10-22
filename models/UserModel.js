const mongoose = require("mongoose");
const { EXCHANGES } = require("../constants");

const userSchema = new mongoose.Schema({
    tg_id: {
        type: String,
        unique: true,
        default: ""
    },
    first_name: {
        type: String,
        default: ""
    },
    last_name: {
        type: String,
        default: ""
    },
    username: {
        type: String,
        default: ""
    },
    wallet_address: {
        type: String,
        default: ""
    },
    point: {
        type: Number,
        default: 1000
    },
    level: {
        type: Number,
        default: 1
    },
    pointPerClick: {
        type: Number,
        default: 1
    },
    exchange: {
        type: Object,
        enum: Object.values(EXCHANGES),
        default: EXCHANGES.BINANCE
    },
    energyLimit: {
        type: Number,
        default: 1000
    },
    turbo: {
        type: Number,
        default: 1
    },
    energySpeed: {
        type: Number,
        default: 3
    },
    fullEnergy: {
        type: Number,
        default: 6
    },
    multiTapLevel: {
        type: Number,
        default: 1
    },
    energyLimitLevel: {
        type: Number,
        default: 1
    },
    profitPerHour: {
        type: Number,
        default: 0
    },
    referral: {
        type: Number,
        default: 0
    },
    invites: {
        type: Number,
        default: 0
    },
    skin: {
        type: String,
        default: "Default"
    },
    tasks: {
        type: Array,
        default: []
    },
    combos: {
        type: Array,
        default: []
    },
    airdrops: {
        type: Object,
        default: {}
    },
    bonus: {
        type: Number,
        default: 0
    },
    highest_earning: {
        type: Number,
        default: 1000
    },
    last_point: {
        type: Number,
        default: 1000
    },
    record_claimed: {
        type: Boolean,
        default: false
    },
    last_claimed: {
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

const User = mongoose.model("User", userSchema);
module.exports = User;