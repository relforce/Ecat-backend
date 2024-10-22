
var express = require('express');
const { route } = require('../app');
const User = require('../models/UserModel');
const { DAILY_REWARD_LIST, CHANNEL_BOT_KEY, BLUM_CHANNEL_BOT_KEY, DAILY_TASK_NAME, TG_CHANNEL_TASK_NAME, BLUM_CHANNEL_TASK_NAME, EXCHANGE_TASK_NAME, INVITE_TASK_NAME, CHANNEL_TASKS, TG_CHANNEL_ID, BLUM_CHANNEL_ID } = require('../constants');
var router = express.Router();


router.get('/fake-daily-tasks', async function (req, res) {

    const userData = await User.findOne({ tg_id: req.user_id }).select(['tasks', 'level', 'point', 'exchange', 'tg_id']);

    userData.tasks = [
        {
            name: DAILY_TASK_NAME,
            days: [new Date('2024-07-21'), new Date('2024-07-22')]
        }
    ]

    await userData.save()

    res.json({ status: 'success', user: userData });
});


/* GET home page. */
router.post('/daily-task', async function (req, res) {

    const userData = await User.findOne({ tg_id: req.user_id });

    // name, created_at...
    const dailyTask = userData.tasks.find(value => value.name == DAILY_TASK_NAME)?.days.sort((a, b) => b - a);
    if (dailyTask?.length) {
        if (dailyTask?.length == 10) {
            return res.json({ status: 'success', days: dailyTask?.length, available: false });
        }
        if (isYesterday(dailyTask[0])) {
            return res.json({ status: 'success', days: dailyTask?.length, available: true });
        } else if (isToday(dailyTask[0])) {
            return res.json({ status: 'success', days: dailyTask?.length, available: false });
        } else {
        }
    }

    userData.tasks = [...userData.tasks].filter(value => value.name !== DAILY_TASK_NAME);

    await userData.save();

    return res.json({ status: 'success', days: 0, available: true });
});

/* GET home page. */
router.post('/claim-daily', async function (req, res) {

    const userData = await User.findOne({ tg_id: req.user_id });

    // name, created_at...
    const dailyTask = userData.tasks.find(value => value.name == DAILY_TASK_NAME)?.days.sort((a, b) => b - a);

    if (dailyTask?.length) {
        // check if all days completed

        if (dailyTask?.length >= 20) {
            return res.json({ status: 'error', days: 20, available: true, user: userData });
        }

        if (isToday(dailyTask[0])) {
            return res.json({ status: 'duplicated', days: dailyTask?.length, available: false });
        } else if (isYesterday(dailyTask[0])) {
            userData.tasks = [...userData.tasks].map(value => {
                if (value.name != DAILY_TASK_NAME) {
                    return value;
                }
                return {
                    name: DAILY_TASK_NAME,
                    days: [new Date().toISOString(), ...dailyTask]
                };
            })
            userData.point += DAILY_REWARD_LIST[dailyTask?.length]
            await userData.save();
            return res.json({ status: 'success', days: dailyTask?.length, point: userData.point, available: false, user: userData });
        }

        return res.json({ status: 'error', days: 0, available: true, user: userData });
    }
    userData.tasks = [...userData.tasks, {
        name: DAILY_TASK_NAME,
        days: [new Date().toISOString()]
    }]

    console.log(userData.tasks);
    userData.point += DAILY_REWARD_LIST[0]
    await userData.save();

    return res.json({ status: 'success', days: 1, available: false, user: userData });
});

/* get user data. */
router.post('/point', async function (req, res) {

    const userData = await User.findOne({ tg_id: req.user_id });

    res.json({ user: userData });
});

/* get user data. */
router.post('/tg-subscribed', async function (req, res, next) {

    try {
        const user = await User.findOne({ tg_id: req.user_id });

        const response = await fetch(`https://api.telegram.org/bot${CHANNEL_BOT_KEY}/getChatMember?chat_id=${TG_CHANNEL_ID}&user_id=${user.tg_id}`)
            .then((res) => {
                return res.json();
            })

        console.log("response", response);
        if (response.ok && response.result.status != "left") {

            const tg_task = user.tasks.find(value => value.name === TG_CHANNEL_TASK_NAME)
            if (!tg_task) {
                user.tasks = [...user.tasks, {
                    name: TG_CHANNEL_TASK_NAME,
                    created_at: new Date().toISOString()
                }];
                user.point += 5000;
                await user.save();
            }
            return res.json({ status: 'success', user });
        }

        return res.status(400).json({ status: "error" });
    }
    catch (e) {
        return next(e);
    }
});

// router.post('/blum-subscribed', async function (req, res, next) {

//     try {
//         const user = await User.findOne({ tg_id: req.user_id });

//         const response = await fetch(`https://api.telegram.org/bot${BLUM_CHANNEL_BOT_KEY}/getChatMember?chat_id=${BLUM_CHANNEL_ID}&user_id=${user.tg_id}`)
//             .then((res) => {
//                 return res.json();
//             })

//         console.log("response", response);
//         if (response.ok && response.result.status != "left") {

//             const blum_task = user.tasks.find(value => value.name === BLUM_CHANNEL_TASK_NAME)
//             if (!blum_task) {
//                 user.tasks = [...user.tasks, {
//                     name: BLUM_CHANNEL_TASK_NAME,
//                     created_at: new Date().toISOString()
//                 }];
//                 user.point += 5000;
//                 await user.save();
//             }
//             return res.json({ status: 'success', user });
//         }

//         return res.status(400).json({ status: "error" });
//     }
//     catch (e) {
//         return next(e);
//     }
// });

/* get user data. */
router.post('/channel-task', async function (req, res, next) {

    const { name } = req.body;

    if (!name || !Object.keys(CHANNEL_TASKS).includes(name)) {
        throw new Error('insufficent full energy!');
    }

    try {
        const user = await User.findOne({ tg_id: req.user_id });
        const channel_task = user.tasks.find(value => value.name === name)
        if (!channel_task) {
            user.tasks = [...user.tasks, {
                name,
                created_at: new Date().toISOString()
            }];
            user.point += CHANNEL_TASKS[name];
            await user.save();
        } else {
            return res.status(400).json({ status: 'error', user });
        }
        return res.json({ status: 'success', user });
    }
    catch (e) {
        return next(e);
    }
});

/* get user data. */
router.post('/exchange-change', async function (req, res) {

    const user = await User.findOne({ tg_id: req.user_id });
    const exchange_task = user.tasks.find(value => value.name === EXCHANGE_TASK_NAME)
    if (!exchange_task) {
        user.tasks = [...user.tasks, {
            name: EXCHANGE_TASK_NAME,
            created_at: new Date().toISOString()
        }];
        user.point += 5000;
        await user.save();
    }
    res.json({ status: 'success', user: user });
});

/* get user data. */
router.post('/invite-check', async function (req, res) {

    const invitedUsers = await User.find({ referral: req.user_id });
    if (invitedUsers?.length < 3) {
        return res.json({ status: 'error' });
    }

    const user = await User.findOne({ tg_id: req.user_id });
    const invite_task = user.tasks.find(value => value.name === INVITE_TASK_NAME)
    if (!invite_task) {
        user.tasks = [...user.tasks, {
            name: INVITE_TASK_NAME,
            created_at: new Date().toISOString()
        }];
        user.point += 25000;
        await user.save();
    }
    return res.json({ status: 'success', user: user });
});

function isYesterday(date) {
    // Create a new Date object for the given date
    const givenDate = new Date(date);

    // Create a new Date object for today
    const today = new Date();

    // Set the time to 00:00:00.000 for accurate comparison
    today.setHours(0, 0, 0, 0);

    // Create a new Date object for yesterday
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Compare the given date with yesterday
    return givenDate.getFullYear() === yesterday.getFullYear() &&
        givenDate.getMonth() === yesterday.getMonth() &&
        givenDate.getDate() === yesterday.getDate();
}

function isToday(date) {
    // Create a new Date object for the given date
    const givenDate = new Date(date);

    // Create a new Date object for today
    const today = new Date();

    // Set the time to 00:00:00.000 for accurate comparison
    today.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);

    // Compare the given date with today
    return givenDate.getTime() === today.getTime();
}


module.exports = router
