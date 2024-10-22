
var express = require('express');
const { route } = require('../app');
const User = require('../models/UserModel');
const { ENERGY_LIMIT_POINT, ENERGY_LIMIT_INCREASE, LEVELINGUP_POINT_USER, LEVELINGUP_POINT_REFERRER, LEVEL_DATA, SKIN_DATA, MULTI_TAPS, ENERGY_LIMITS, TURBO_DATA, USER_STATUS } = require('../constants');
const Lottery = require('../models/LotteryModel');
var router = express.Router();

/* GET home page. */
router.get('/fake-point', async function (req, res) {

    const user = await User.findOne({ tg_id: req.user_id });
    user.point = 10000;
    user.level = 2;
    await user.save();

    res.json({ status: 'success' });
});

/* GET home page. */
router.post('/get/all', async function (req, res) {

    const userData = await User.find().select(['username', 'level', 'point', 'exchange', 'profitPerHour']);

    res.json({ status: 'success', users: userData });
});

/* get user data. */
router.post('/point', async function (req, res) {

    const userData = await User.findOne({ tg_id: req.user_id });

    res.json({ user: userData });
});

/* get user data. */
router.post('/delete-account', async function (req, res) {

    const userData = await User.findOne({ tg_id: req.user_id });

    userData.status = USER_STATUS.DENIED;

    await userData.save()

    res.json({ user: userData });
});

// update user data
router.post('/update', async function (req, res) {

    // const { point, energy, energyLimit, level, exchange, fullEnergy, dailyBonus, profitPerHour } = req.body;

    const varArray = ["point", "energy", "energyLimit", "exchange", "fullEnergy", "dailyBonus", "profitPerHour", "energyLimitLevel", "multiTapLevel"]

    const user = await User.findOne({ tg_id: req.user_id });

    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: 'User not Found!'
        })
    }

    let levelUpdated = false;

    const referrer = await User.findOne({ tg_id: user.referral });
    varArray.map(value => {
        if (req.body[value] != undefined) {

            if (value == 'point') {
                var level = user.level;
                var oldPoint = user.point;
                const point = req.body[value];

                // check if the point updating too much(scam check)
                if(point < oldPoint) {
                    req.body[value] = oldPoint;
                    return false;
                }

                const newLevel = Object.values(LEVEL_DATA).filter(data => data.point < point)?.length
                if (level != newLevel && level < newLevel) {
                    user.level = newLevel ? newLevel : 1;
                    user.point += LEVELINGUP_POINT_USER[newLevel - 2];
                    if(referrer) {
                        referrer.point += LEVELINGUP_POINT_REFERRER[newLevel - 2];
                    }
                    levelUpdated = true;

                    return false;
                }
            }

            user[value] = req.body[value];
        }
    })

    await user.save();
    if(referrer) {
        await referrer.save();
    }
    return res.json({ status: 'success', user: user, levelUpdated });
});

/* get user data. */
router.post('/full-energy', async function (req, res, next) {

    try {
        const userData = await User.findOne({ tg_id: req.user_id });

        if (userData.fullEnergy <= 0) {
            throw new Error('insufficent full energy!');
        }

        userData.fullEnergy -= 1

        await userData.save();

        res.json({ user: userData });
    }

    catch (e) {
        next(e);
    }
});


/* get user data. */
router.post('/daily-record', async function (req, res, next) {

    try {
        const userData = await User.findOne({ tg_id: req.user_id });
        console.log("userData", userData);
        if (!userData || userData.record_claimed) {
            throw new Error('No user or claimed already.');
        }

        if (userData.point - userData.last_point < userData.highest_earning) {
            throw new Error('Not reached to highest daily earning record.');
        }

        userData.point += 10000
        userData.record_claimed = true;

        await userData.save();

        res.json({ user: userData });
    }

    catch (e) {
        next(e);
    }
});

/* GET home page. */
router.post('/participat-lottery', async function (req, res) {

    try {
        const dailyLotteryData = await Lottery.findOne({ day: new Date().toLocaleDateString("en-US") });
        console.log("dailyLotteryData", dailyLotteryData);
        const userData = await User.findOne({ tg_id: req.user_id });

        if (!userData || !dailyLotteryData) {
            return res.json({
                status: 'error',
                message: 'User or Lottery data not Found!'
            })
        }
        if (dailyLotteryData.participants.indexOf(userData._id) < 0) {
            dailyLotteryData.participants = [...dailyLotteryData.participants, userData._id];
        } else {
            return res.json({
                status: 'error',
                message: 'Participated successfully!'
            })
        }

        await dailyLotteryData.save();

        return res.json({ status: 'success', lottery: dailyLotteryData });
    }
    catch (e) {
        return next(e);
    }
});

/* GET home page. */
router.post('/get-lottery', async function (req, res) {

    try {

        let yesterday = new Date();

        yesterday.setDate(yesterday.getDate() - 1);

        const dailyLotteryData = await Lottery.findOne({ day: yesterday.toLocaleDateString("en-US") });

        const userData = await User.findOne({ tg_id: req.user_id });

        if (!userData || !dailyLotteryData) {
            return res.status(400).json({
                status: 'error',
                message: 'User or Lottery data not Found!'
            })
        }

        return res.json({ status: 'success', lottery: dailyLotteryData });
    }
    catch (e) {
        return next(e);
    }
});

/* GET home page. */
router.post('/get-lottery-winners', async function (req, res) {

    try {

        let lotteries = await Lottery.find({}).select(['winner', 'day']).sort({ day: -1 });

        let users = await User.find({}).select(['_id', 'username']);

        lotteries = lotteries.filter(lot => !!lot.winner).map(lot => {
            const user = users.find(user => user._id == lot.winner);
            return {
                day: new Date(lot.day).toLocaleDateString('en-US', { dateStyle: 'medium' }),
                winner: user?.username ?? 'unknown'
            }
        });

        return res.json({ status: 'success', lottery: lotteries });
    }
    catch (e) {
        return next(e);
    }
});



/* get user data. */
router.post('/energy-level', async function (req, res, next) {

    try {
        const userData = await User.findOne({ tg_id: req.user_id });

        if (userData.point <= ENERGY_LIMITS[userData.energyLimitLevel + 1].point) {
            throw new Error('insufficent point to update energy limit!');
        }

        userData.point -= ENERGY_LIMITS[userData.energyLimitLevel + 1].point;
        userData.energyLimit += ENERGY_LIMITS[userData.energyLimitLevel + 1].increase;
        userData.energyLimitLevel += 1;

        await userData.save();

        res.json({ user: userData });
    }

    catch (e) {
        next(e);
    }
});

/* get user data. */
router.post('/turbo', async function (req, res, next) {

    try {
        const userData = await User.findOne({ tg_id: req.user_id });

        if (!userData.turbo) {
            throw new Error('no turbo to use!');
        }

        userData.turbo = 0;

        await userData.save();

        res.json({ user: userData });
    }

    catch (e) {
        next(e);
    }
});

/* get user data. */
router.post('/multi-tap', async function (req, res, next) {

    try {
        const userData = await User.findOne({ tg_id: req.user_id });
        console.log("userData", userData);
        if (userData.point <= MULTI_TAPS[userData.multiTapLevel + 1].point) {
            throw new Error('insufficent point to update multi-tap!');
        }

        userData.pointPerClick += MULTI_TAPS[userData.multiTapLevel + 1].increase;
        userData.point -= MULTI_TAPS[userData.multiTapLevel + 1].point;
        userData.multiTapLevel += 1;

        await userData.save();

        res.json({ user: userData });
    }

    catch (e) {
        next(e);
    }
});

/* get user data. */
router.post('/buy-skin', async function (req, res, next) {

    try {

        const { name } = req.body;
        if (!name || !SKIN_DATA[name]) {
            throw new Error('no name or not found name!');
        }
        const userData = await User.findOne({ tg_id: req.user_id });

        if (userData.point <= SKIN_DATA[name].points || userData.level <= SKIN_DATA[name].level) {
            throw new Error('insufficent point or level to update skin!');
        }

        userData.point -= SKIN_DATA[name].points;
        userData.skin = name;

        await userData.save()

        return res.json({ user: userData });
    }

    catch (e) {
        return next(e);
    }
});


/* GET home page. */
router.post('/get/friends', async function (req, res, next) {
    console.log("req", req.user_id);

    try {
        const friendsData = await User.find({ referral: req.user_id });

        res.json({ status: 'success', friends: friendsData });
    }
    catch (e) {
        next(e);
    }
});


module.exports = router
