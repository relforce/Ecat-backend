const { validate, parse } = require('@telegram-apps/init-data-node');
const { BOT_SECRET_KEY, PRODUCTION_MODE, USER_STATUS } = require('../constants');

const User = require('../models/UserModel')

exports.authMiddleware = async (req, res, next) => {
    // We expect passing init data in the Authorization header in the following format:
    // <auth-type> <auth-data>
    // <auth-type> must be "tma", and <auth-data> is Telegram Mini Apps init data.

    const [authType, authData = ''] = (req.header('authorization') || '').split(' ');

    const { startParam } = req.body;

    if (!PRODUCTION_MODE) {

        const user = {
            id: 7483219571,
            firstName: 'jack',
            lastName: 'jack',
            username: 'jackson'
        }

        const authDate = '2024-02-09';

        req.user_id = 7483219571;
        req.user = user;
        req.authDate = authDate;
        req.startParam = startParam;

        // const existingUser = await User.findOne({ tg_id: user.id })
        // // check if user already deleted or not
        // if (existingUser?.status == USER_STATUS.DENIED) {
        //     return next(new Error('Unauthorized'));
        // }

        return next();
    }

    switch (authType) {
        case 'tma':
            try {
                // Validate init data.
                validate(authData, BOT_SECRET_KEY, {
                    // We consider init data sign valid for 1 hour from their creation moment.
                    expiresIn: 3600,
                });

                // Parse init data. We will surely need it in the future.
                const { user, authDate } = parse(authData)
                console.log(user);

                // const existingUser = await User.findOne({ tg_id: user.id })

                // if (!existingUser) {
                //     const newUser = new User;
                //     newUser.tg_id = user.id;
                //     newUser.first_name = user.firstName;
                //     newUser.last_name = user.lastName;
                //     newUser.username = user.username;
                //     newUser.created_at = authDate;
                //     newUser.point = 1000;

                //     if (startParam && startParam.replace("kentId", "") != user.id) {
                //         newUser.point = 5000;
                //         newUser.referral = startParam.replace("kentId", "");

                //         // add referral point
                //         const referral = await User.findOne({ tg_id: startParam.replace("kentId", "") });
                //         if (referral) {
                //             referral.point += 5000;
                //             referral.invites += 1;
                //             await referral.save();
                //         }
                //     }

                //     newUser.isNewUser = true;
                //     await newUser.save();
                // }

                // // check if user already deleted or not
                // if (existingUser?.status == USER_STATUS.DENIED) {
                //     return next(new Error('Unauthorized'));
                // }

                req.user_id = user.id;
                req.user = user;
                req.authDate = authDate;
                req.startParam = startParam;

                return next();
            } catch (e) {
                return next(e);
            }
        // ... other authorization methods.
        default:
            return next(new Error('Unauthorized'));
    }
};