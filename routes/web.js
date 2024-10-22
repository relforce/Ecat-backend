
var express = require('express');
const { route } = require('../app');
const User = require('../models/UserModel');
const { AIRDROP_TASK_NAME } = require('../constants');
var router = express.Router();


router.post('/connect-wallet', async function (req, res) {

    const { account, tg_id } = req.body;
    if (!account) {
        return res.status(400).json({ status: 'error' });
    }
    const userData = await User.findOne({ tg_id: tg_id }).select(['tasks']);

    if(!userData) {
        return res.status(400).json({ status: 'error', message: "No user account found." });
    }

    const existingTask = userData.tasks.find(value => value.name == AIRDROP_TASK_NAME);

    // if (existingTask) {
    //     return res.json({ status: 'error', message: "Already connected wallet." });
    // }

    userData.tasks = [
        ...userData.tasks,
        {
            name: AIRDROP_TASK_NAME,
            day: new Date().toISOString()
        }
    ]

    userData.wallet_address = account;

    await userData.save()

    return res.json({ status: 'success', user: userData });
});

module.exports = router
