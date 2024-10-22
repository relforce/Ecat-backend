var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose')
const { default: rateLimit } = require('express-rate-limit');
const cron = require('node-cron')
const { Telegraf, Markup } = require('telegraf');

const indexRouter = require('./routes/index')
const webRouter = require('./routes/web')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const comboRouter = require('./routes/combo')
const taskRouter = require('./routes/task')
const airdropRouter = require('./routes/airdrop')

const { authMiddleware } = require('./middlewares/auth');
const { BOT_SECRET_KEY, PRODUCTION_MODE } = require('./constants');
const { updateDaily } = require('./cronJob');
const { message } = require('telegraf/filters');
const { link } = require('telegraf/format');

mongoose.connect(
    // `mongodb://127.0.0.1:27017/uzi-hamster-database`,
    `mongodb+srv://cryptodev0124:!Mylovestar0124@cluster0.hjeqe.mongodb.net/ecat-kombat-database`,
    // `mongodb+srv://chaolongpiao:milestone@cluster0.tutd4hz.mongodb.net/mat-hamster-database`,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

const limiter = rateLimit({
    max: 10000,
    windowMs: 60 * 60 * 1000,
    message: 'Too Many Request from this IP, please try again in an hour'
});

cron.schedule("00 01 00 * * *", function () {
    updateDaily();
});

const bot = new Telegraf(BOT_SECRET_KEY);

var app = express();
app.use(cors({
    origin: '*'
}));

app.use('/api', limiter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/web', webRouter);

app.use(authMiddleware);
app.use('/api/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/combo', comboRouter);
app.use('/api/task', taskRouter);
app.use('/api/airdrop', airdropRouter);

updateDaily();

module.exports = app;
