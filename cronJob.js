const Combo = require("./models/ComboModel");
const DailyCipher = require("./models/DailyCipherModel");
const DailyCombo = require("./models/DailyComboModel");
const { rword } = require('rword');
const User = require("./models/UserModel");
const Lottery = require("./models/LotteryModel");

exports.updateDaily = async () => {
    console.log("response1");
    try {

        let dailyComboData = await DailyCombo.findOne({ day: new Date().toLocaleDateString("en-US") });

        if (!dailyComboData) {
            const dailyComboData = new DailyCombo;
            dailyComboData.day = new Date().toLocaleDateString("en-US");

            const combos = Combo.find({});
            Array(3).fill(1).map((value, index) => {
                const selectedIndex = Math.floor(combos.length * Math.random());
                dailyComboData[`combo_id${index + 1}`] = combos[selectedIndex];
            })

            var start = new Date();
            start.setHours(0, 0, 0, 0);

            dailyComboData.limited_at = start.getTime() + Math.random() * 86400000;

            await dailyComboData.save();
        }

        let dailyCipher = await DailyCipher.findOne({ day: new Date().toLocaleDateString("en-US") });

        if (!dailyCipher) {

            const dailyCipher = new DailyCipher;
            dailyCipher.day = new Date().toLocaleDateString("en-US");
            dailyCipher.cipher = rword.generate(1, { length: '4-5' });

            const start = new Date();
            start.setHours(0, 0, 0, 0);

            dailyCipher.limited_at = start.getTime() + Math.random() * 86400000;

            await dailyCipher.save()
        }

        let yesterday = new Date();

        yesterday.setDate(yesterday.getDate() - 1);

        let yesterdayLottery = await Lottery.findOne({ day: yesterday.toLocaleDateString("en-US"), claimed: false });

        if (yesterdayLottery) {
            const participants = yesterdayLottery.participants;
            const selectedIndex = (participants?.length - 1) * Math.random();
            const user_id = participants[selectedIndex];

            const userData = await User.findOne({ _id: user_id });
            if (userData) {
                userData.point += 1000000;
                await userData.save();
                yesterdayLottery.claimed = true;
                yesterdayLottery.winner = user_id;
                await yesterdayLottery.save();
            }
        }

        let dailyLottery = await Lottery.findOne({ day: new Date().toLocaleDateString("en-US") });

        if (!dailyLottery) {

            const dailyLottery = new Lottery;
            dailyLottery.day = new Date().toLocaleDateString("en-US");

            await dailyLottery.save()
        }

        const users = await User.find({});

        Promise.all(users.map(async (user) => {
            user.fullEnergy = 6;
            user.turbo = 1;
            user.record_claimed = false;
            user.highest_earning = Math.max(user.highest_earning, user.point - user.last_point);
            user.last_point = user.point;
            await user.save();
        }))

        // await User.updateMany(
        //     {},
        //     [{
        //         $set: { fullEnergy: 6, turbo: 1, record_claimed: false, last_point: "$point", highest_earning: { $add: ["$point", "-$last_point"] } }
        //     }]
        // );

        return false;
    }

    catch (e) {
        console.log('cron-daily', e);
    }
}