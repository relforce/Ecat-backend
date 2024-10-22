var express = require('express');
const User = require('../models/UserModel');
const { USER_STATUS } = require('../constants');
var router = express.Router();

/* GET home page. */
router.post('/', async function (req, res, next) {

    const userData = await User.findOne({ tg_id: req.user_id });

    if (!userData) {
        const { user, authDate, startParam } = req;

        const newUser = new User;
        newUser.tg_id = user.id;
        newUser.first_name = user.firstName;
        newUser.last_name = user.lastName;
        newUser.username = user.username;
        newUser.isPremium = user.isPremium ?? false;
        newUser.created_at = authDate;
        newUser.point = 1000;

        if (startParam && startParam.replace("kentId", "") != user.id) {
            newUser.point = user.isPremium ? 10000 : 5000;
            newUser.referral = startParam.replace("kentId", "");

            // add referral point
            const referral = await User.findOne({ tg_id: startParam.replace("kentId", "") });
            if (referral) {
                referral.point += user.isPremium ? 10000 : 5000;
                referral.invites += 1;
                await referral.save();
            }
        }

        newUser.isNewUser = true;
        await newUser.save();
        return res.json({ user: newUser });
    }

    // check if user already deleted or not
    if (userData?.status == USER_STATUS.DENIED) {
        return next(new Error('Unauthorized'));
    }

    if (userData.last_claimed > 0) {
        const claimableBonus = (new Date().getTime() / 1000 - userData.last_claimed) / 3600 * userData.profitPerHour;

        userData.bonus = Math.floor(claimableBonus);
    }

    userData.last_claimed = new Date().getTime() / 1000;
    await userData.save();

    res.json({ user: userData });
});

module.exports = router