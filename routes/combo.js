
var express = require('express');
const { route } = require('../app');
const User = require('../models/UserModel');
const { ENERGY_LIMIT_POINT, ENERGY_LIMIT_INCREASE, MINT_CATEGORIES, CIPHER_TABLE, DAILY_TASK_NAME, TG_CHANNEL_TASK_NAME, COMBO_TYPES, COMBO_LISTS, PRODUCTION_MODE } = require('../constants');
const Combo = require('../models/ComboModel');
const DailyCombo = require('../models/DailyComboModel');
const DailyCipher = require('../models/DailyCipherModel');
var router = express.Router();

/* GET home page. */
router.get('/fake-combo', async function (req, res) {

    if(PRODUCTION_MODE) {
        return res.status(400).json({
            status: 'error',
            message: 'User not Found!'
        })
    }

    await Combo.deleteMany({});

    const comboData = COMBO_LISTS;

    Promise.all(comboData.map(async (value, index) => {
        const combo = new Combo;
        combo.name = value.name
        combo.img = value.img
        combo.category = value.category
        combo.desc = value.desc
        combo.profitPerHour = value.profitPerHour
        combo.level = value.level,
        combo.type = index < 10 ? 'Skill' : 'Mine';
        combo.side = index % 2 ? 'negative' : 'positive';
        combo.data = {
            levels: {
                1: {
                    profitPerHour: value.profitPerHour,
                    point: value.point,
                }
            },
            required: {
                // combo: {
                //     id: ,
                //     level: ,
                // },
                invites: 0
            }
        }
        combo.point = value.point;

        await combo.save()
    }))

    res.json({ status: 'success' });
});

/* GET home page. */
router.get('/fake-daily', async function (req, res) {

    const combo = new DailyCombo;
    combo.day = new Date().toLocaleDateString("en-US");
    combo.combo_id1 = "669d547eadaebb16eceaf872";
    combo.combo_id2 = "669d547eadaebb16eceaf872";
    combo.combo_id3 = "669d547eadaebb16eceaf872";

    var start = new Date();
    start.setHours(0, 0, 0, 0);

    combo.limited_at = start.getTime() + Math.random() * 86400000;

    await combo.save()

    res.json({ status: 'success', combos: combo });
});

/* GET home page. */
router.get('/fake-cip', async function (req, res) {

    const cipher = new DailyCipher;
    cipher.day = new Date().toLocaleDateString("en-US");
    cipher.cipher = "alpha";

    var start = new Date();
    start.setHours(0, 0, 0, 0);

    cipher.limited_at = start.getTime() + Math.random() * 86400000;

    await cipher.save()

    res.json({ status: 'success', combos: cipher });
});

/* GET home page. */
router.post('/get/all', async function (req, res) {

    const comboData = await Combo.find().select('-created_at');

    res.json({ status: 'success', combos: comboData });
});

/* GET home page. */
router.post('/get/dailycombo', async function (req, res) {

    const dailyComboData = await DailyCombo.findOne({ day: new Date().toLocaleDateString("en-US") }).select(['-combo_id1', '-combo_id2', '-combo_id3']);

    const dailyCipher = await DailyCipher.findOne({ day: new Date().toLocaleDateString("en-US") }).select(['-cipher']);

    const userData = await User.findOne({ tg_id: req.user_id });

    if(!userData) {
        return res.status(400).json({
            status: 'error',
            message: 'User not Found!'
        })
    }

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const dailyTask = userData.tasks.find(value => value.name == DAILY_TASK_NAME)?.days.sort((a, b) => b - a);
    if (!dailyTask || dailyTask?.length < 10) {
        return res.json({ status: 'success', combo: dailyComboData, cipher: dailyCipher, dailyReward: end });
    }

    return res.json({ status: 'success', combo: dailyComboData, cipher: dailyCipher, dailyReward: '' });
});


/* GET home page. */
router.post('/get/skill', async function (req, res) {

    const comboData = await Combo.find({ type: COMBO_TYPES.SKILL }).select('-created_at');
    console.log("debug->comboData", comboData);

    const user = await User.findOne({ tg_id: req.user_id });

    res.json({ status: 'success', combos: comboData, user });
});

/* GET home page. */
router.post('/get/:category', async function (req, res) {

    const { category } = req.params;
    const comboData = await Combo.find({ category: category }).select('-created_at');
    console.log("comboData", comboData);

    const user = await User.findOne({ tg_id: req.user_id });

    res.json({ status: 'success', combos: comboData, user });
});


// /* get user data. */
// router.post('/point', async function (req, res) {

//     const comboData = await User.findOne({ tg_id: req.user_id });

//     res.json({ combos: comboData });
// });

// // update user data
// router.post('/update', async function (req, res) {

//     // const { point, energy, energyLimit, level, exchange, fullEnergy, dailyBonus, profitPerHour } = req.body;

//     const varArray = ["point", "energy", "energyLimit", "level", "exchange", "fullEnergy", "dailyBonus", "profitPerHour"]

//     const user = await User.findOne({ tg_id: req.user_id });

//     varArray.map(value => {
//         if (req.body[value] != undefined) {
//             user[value] = req.body[value];
//         }
//     })

//     await user.save();

//     res.json({ status: 'success', user: user });
// });

// /* get user data. */
router.post('/mint-combo', async function (req, res, next) {

    try {

        const { id } = req.body;

        const user = await User.findOne({ tg_id: req.user_id });

        const combo = await Combo.findOne({ _id: id });

        const existingCombo = user.combos.find(value => value._id == id);

        if (!combo) {
            return res.status(400).json({
                status: 'error',
                message: 'No combo found!'
            })
        }

        // check validation for some combos restricted

        const { required } = combo.data;

        if (required?.combo) {
            const { id, level } = required?.combo;
            const existingCombo = user.combos.find(value => value._id == id);
            if (!existingCombo || existingCombo.level < level) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Not meet combo required!'
                })
            }
        }

        if (!!required?.invites) {
            if (user.invites < +required?.invites) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Not meet invites required!'
                })
            }
        }

        // {
        //     _id: combo._id,
        //    level:2,
        //     created_at: new Date().toISOString()
        // }
        if (existingCombo) {

            const currentLevel = existingCombo.level;
            if (!combo.data?.levels[currentLevel + 1]) {
                return res.status(400).json({
                    status: 'error',
                    message: 'No more upgrade!'
                })
            }

            const comboData = combo.data?.levels[currentLevel + 1];

            if (comboData.point > user.point) {
                return res.status(400).json({
                    status: 'error',
                    message: 'insufficient mint!'
                })
            }

            user.point -= comboData.point;
            user.profitPerHour += comboData.profitPerHour;

            // add combo to user
            user.combos = [
                ...user.combos.filter(value => value._id != id),
                {
                    _id: id,
                    level: currentLevel + 1,
                    type: combo.type,
                    name: combo.name,
                    created_at: new Date().toISOString()
                }
            ];
            await user.save();

            return res.json({ user: user });
        }

        // validate if can afford

        const comboData = combo.data?.levels[1];

        if (user.point < comboData.point) {
            return res.status(400).json({
                status: 'error',
                message: 'Cannot mint!'
            })
        }

        user.point -= comboData.point;
        user.profitPerHour += comboData.profitPerHour;

        // add combo to user
        user.combos = [
            ...user.combos,
            {
                _id: id,
                name: combo.name,
                type: combo.type,
                level: 1,
                created_at: new Date().toISOString()
            }
        ];

        await user.save();

        return res.json({ user: user });
    }

    catch (e) {
        next(e);
    }
});

router.post('/check-daily', async function (req, res, next) {

    try {
        const user = await User.findOne({ tg_id: req.user_id });

        var start = new Date();
        start.setHours(0, 0, 0, 0);

        const dailyUserCombos = user.combos.filter(_combo => new Date(_combo.created_at) > start);

        const dailyComboData = await DailyCombo.findOne({ day: new Date().toLocaleDateString("en-US") }).select(['combo_id1', 'combo_id2', 'combo_id3']);

        if (!dailyComboData || dailyUserCombos) {
            return res.json({
                status: 'error',
                matchs: []
            });
        }

        const uniqueDailyUserCombos = [...new Set(dailyUserCombos.map(item => item._id.toString()))];

        const matchedComboIds = uniqueDailyUserCombos.filter(_combo => [dailyComboData.combo_id1?.toString(), dailyComboData.combo_id2?.toString(), dailyComboData.combo_id3?.toString()].indexOf(_combo) > -1);

        const matchedCombos = matchedComboIds.map(value => {
            return dailyUserCombos.find(combo => combo._id.toString() == value);
        })

        return res.json({
            status: 'success',
            matchs: matchedCombos
        });
    }

    catch (e) {
        next(e);
    }
});

// /* get user data. */
// router.post('/energy-level', async function (req, res, next) {

//     try {
//         const userData = await User.findOne({ tg_id: req.user_id });

//         if (userData.point <= ENERGY_LIMIT_POINT) {
//             throw  new Error('insufficent point to update energy limit!');
//         }

//         userData.energyLimit += ENERGY_LIMIT_INCREASE;

//         res.json({ user: userData });
//     }

//     catch (e) {
//         next(e);
//     }
// });

router.post('/daily-cipher', async function (req, res, next) {

    const { cipher } = req.body;

    try {
        const dailyCipher = await DailyCipher.findOne({ day: new Date().toLocaleDateString("en-US") });

        const cipherBits = dailyCipher.cipher.split('').map(value => CIPHER_TABLE[value.toUpperCase()]);
        console.log(cipherBits);

        const stringedCipher = cipher.join(' ');
        const stringedDaily = cipherBits.join(' ');

        if (stringedDaily.indexOf(stringedCipher) == 0) {
            if (stringedDaily == stringedCipher) {
                return res.json({ status: 'ok', cipher: cipher, point: dailyCipher.point });
            }
            return res.json({ status: 'success', cipher: [...cipher, ''] });
        }

        return res.json({ status: 'error', cipher: [''] });
    }
    catch (e) {
        next(e);
    }
});

module.exports = router
