//----------------------------Level Constants-------------------------------//
exports.PRODUCTION_MODE = false;

//----------------------------Level Constants-------------------------------//
exports.LEVELS = [1, 2, 3, 4, 5, 6, 7];
exports.TOP_LEVEL = 7;
exports.LEVEL_DATA = {
    1: {
        name: 'BabyCat',
        point: 0,
        energy: 1000,
        pointPerClick: 1,
    },
    2: {
        name: 'ChildCat',
        point: 10000,
        energy: 1500,
        pointPerClick: 2
    },
    3: {
        name: 'BoyCat',
        point: 25000,
        energy: 1500,
        pointPerClick: 2
    },
    4: {
        name: 'MoonCat',
        point: 50000,
        energy: 2000,
        pointPerClick: 3
    },
    5: {
        name: 'Explorer',
        point: 250000,
        energy: 2500,
        pointPerClick: 4
    },
    6: {
        name: 'Millionaire',
        point: 1000000,
        energy: 3000,
        pointPerClick: 5
    },
    7: {
        name: 'Billionaire',
        point: 1000000000,
        energy: 3000,
        pointPerClick: 5
    },
}

//----------------------------Exchange Constants-------------------------------//

exports.EXCHANGES = {
    BINANCE: {
        name: 'Binance'
    },
    OKX: {
        name: 'OKX'
    },
    CRYPTO_DOT_COM: {
        name: 'Crypto.com'
    },
    BYBIT: {
        name: 'Bybit'
    },
    BINGX: {
        name: 'BingX'
    },
    HTX: {
        name: 'HTX'
    },
    KUCOIN: {
        name: 'Kucoin'
    },
    GATE_DOT_IO: {
        name: 'Gate.io'
    },
    MEXC: {
        name: 'MEXC'
    },
    BITSET: {
        name: 'Bitset'
    },
    HAMSTER: {
        name: 'Hamster'
    }
}


//----------------------------Mine Constants-------------------------------//

exports.MINT_CATEGORIES = {
    STUDENT: 'BabyCat',
    TRAINEE: 'ChildCat',
    EMPLOYEE: 'BoyCat',
    MANAGER: 'MoonCat',
    BOSS: 'Explorer',
    MILLIONAIRE: 'Millionaire',
    BILLIONAIRE: 'Billionaire',
};


//----------------------------TASK Constants-------------------------------//

exports.TASK_CATEGORIES = {
    YOUTUBE: 'ECat Youtube',
    DAILY: 'Daily tasks',
    LIST: 'Tasks list',
};


//----------------------------TELEGRAM Constants-------------------------------//

exports.BOT_SECRET_KEY = "7468580976:AAFWgKAEkRZNTG1S1m01ytVTNwqVvNjEUmU";
exports.CHANNEL_BOT_KEY = "6859656305:AAHNILHWsWinElFlCuNCK4_Aorppt2_0CAc";
exports.TG_CHANNEL_ID = '@eloncat_finance_chat';
exports.BLUM_CHANNEL_BOT_KEY = "7529859544:AAGsLtHnOWwbsaoRqq_7nVy0zV6qOshc-mQ";
exports.BLUM_CHANNEL_ID = '@blumcheckchannel';

//----------------------------ENERGY LIMIT Constants-------------------------------//

exports.ENERGY_LIMIT_POINT = 2000;
exports.ENERGY_LIMIT_INCREASE = 500;


exports.CIPHER_TABLE = {
    'A': '01',
    'B': '1000',
    'C': '1010',
    'D': '100',
    'E': '0',
    'F': '0010',
    'G': '110',
    'H': '0000',
    'I': '00',
    'J': '0111',
    'K': '101',
    'L': '0100',
    'M': '11',
    'N': '10',
    'O': '111',
    'P': '0110',
    'Q': '1101',
    'R': '010',
    'S': '000',
    'T': '1',
    'U': '001',
    'V': '0001',
    'W': '011',
    'X': '1001',
    'Y': '1011',
    'Z': '1100',
    '0': '11111',
    '1': '01111',
    '2': '00111',
    '3': '00011',
    '4': '00001',
    '5': '00000',
    '6': '10000',
    '7': '11000',
    '8': '11100',
    '9': '11110',
}

//----------------------------Cipher Constants-------------------------------//

exports.DAILY_REWARD_LIST = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000];

//----------------------------Leveling up Constants--------------------------//

exports.LEVELINGUP_POINT_USER = [5000, 6000, 7000, 8000, 9000, 10000];
exports.LEVELINGUP_POINT_REFERRER = [10000, 20000, 30000, 40000, 500000, 60000];

//----------------------------Task Constants-------------------------------//

exports.DAILY_TASK_NAME = 'daily-task';
exports.TG_CHANNEL_TASK_NAME = 'tg-channel';
exports.BLUM_CHANNEL_TASK_NAME = 'blum-channel';
exports.INVITE_TASK_NAME = 'invite-task';
exports.EXCHANGE_TASK_NAME = 'exchange-task';
exports.AIRDROP_TASK_NAME = 'airdrop-task';
exports.YOTUBE_CHANNEL_NAME = 'youtube-channel';
exports.NEW_YOUTUBE_CHANNEL_NAME = 'new-youtube-channel';
exports.X_CHANNEL_NAME = 'x-channel';
exports.DISCORD_CHANNEL_NAME = 'discord-channel';
exports.FACEBOOK_CHANNEL_NAME = 'facebook-channel';
exports.INSTAGRN_CHANNEL_NAME = 'instagram-channel';

exports.CHANNEL_TASKS = { 'youtube-channel': 10000, 'new-youtube-channel': 10000, 'x-channel': 5000, 'tg-channel': 5000, 'blum-channel': 10000, 'discord-channel': 5000, 'facebook-channel': 5000, 'instagram-channel': 5000 };

//----------------------------Skins Constants-------------------------------//

exports.SKIN_DATA = {
    Default: {
        url: "",
        description: "Your league's default skin",
        points: 0,
        level: 0
    },
    Marta: {
        url: "/images/skins/skin1.jpg",
        description: "Marta is the kind-hearted hamster who loves helping others and always has a warm smile for everyone",
        points: 2500000,
        level: 3
    },
    Homie: {
        url: "/images/skins/skin2.jpg",
        description: "Homie is the loyal friend who enjoys spending time with his buddies and always knows how to make everyone feel at home",
        points: 2500000,
        level: 3
    },

    Fighty: {
        url: "/images/skins/skin3.jpg",
        description: "Fighty is full of energy and enthusiasm, always up for a fun adventure or a new game with friends",
        points: 2500000,
        level: 3
    },
}

//----------------------------MultiTap Constants-------------------------------//

exports.MULTI_TAPS = {
    1: {
        point: 500,
        increase: 1
    },
    2: {
        point: 2000,
        increase: 1
    },
    3: {
        point: 10000,
        increase: 2
    },
    4: {
        point: 50000,
        increase: 3
    },
    5: {
        point: 100000,
        increase: 4
    },
}

//----------------------------Energy Limit Level Constants-------------------------------//

exports.ENERGY_LIMITS = {
    1: {
        point: 2000,
        increase: 500
    },
    2: {
        point: 10000,
        increase: 1000
    },
    3: {
        point: 50000,
        increase: 1500
    },
    4: {
        point: 100000,
        increase: 2000
    },
    5: {
        point: 500000,
        increase: 2500
    },
}

//----------------------------multitap Constants-------------------------------//

exports.TURBO_DATA = {
    1: {
        point: 500,
        increase: 1
    },
    2: {
        point: 2000,
        increase: 1
    },
    3: {
        point: 10000,
        increase: 2
    },
    4: {
        point: 50000,
        increase: 3
    },
    5: {
        point: 5000000,
        increase: 4
    },
}

exports.TITANS = [1, 2, 3, 4, 5];

//----------------------------Combo Type Constants-------------------------------//

exports.COMBO_TYPES = {
    SKILL: "Skill",
    MINE: 'Mine'
}

exports.COMBO_SIDE = {
    POSITIVE: "positive",
    NEGATIVE: 'negative'
}

exports.COMBO_LISTS = [
    {
        name: 'How to walk',
        desc: 'Learn to walk from mother cat',
        img: "/images/skills/Student/1.png",
        category: this.MINT_CATEGORIES.STUDENT,
        profitPerHour: 20,
        point: 1000,
    },
    {
        name: 'How to avoid your enemies',
        desc: 'Learn how to avoid the eyes of your enemies',
        img: "/images/skills/Student/2.png",
        category: this.MINT_CATEGORIES.STUDENT,
        profitPerHour: 30,
        point: 1000,
    },
    // {
    //     name: 'Pass An Exam',
    //     desc: 'Study, work hard and ace that exam!',
    //     img: "",
    //     category: this.MINT_CATEGORIES.STUDENT,
    //     profitPerHour: 50,
    //     point: 2000,
    // },
    // {
    //     name: 'Cheat on Exams',
    //     desc: 'Get ahead of the class, who will know?',
    //     img: "/images/skills/Student/2.png",
    //     category: this.MINT_CATEGORIES.STUDENT,
    //     profitPerHour: 60,
    //     point: 2000,
    // },
    // {
    //     name: 'Join the sports team',
    //     desc: 'Get picked for the team',
    //     img: "/images/skills/Student/3.png",
    //     category: this.MINT_CATEGORIES.STUDENT,
    //     profitPerHour: 70,
    //     point: 3000,
    // },
    // {
    //     name: 'Get Your Dad to Coach the Sports Team',
    //     desc: 'He\'ll make you captain',
    //     img: "",
    //     category: this.MINT_CATEGORIES.STUDENT,
    //     profitPerHour: 80,
    //     point: 3000,
    // },
    // {
    //     name: 'Become the best student of the year',
    //     desc: 'Studying hard pays off',
    //     img: "/images/skills/Student/4.png",
    //     category: this.MINT_CATEGORIES.STUDENT,
    //     profitPerHour: 100,
    //     point: 5000,
    // },
    // {
    //     name: 'Bribe the teachers to give you top marks without any effort.',
    //     desc: 'They need the money, you need the marks, everybody wins',
    //     img: "",
    //     category: this.MINT_CATEGORIES.STUDENT,
    //     profitPerHour: 120,
    //     point: 5000,
    // },
    // {
    //     name: 'Get an MBA',
    //     desc: 'Extra qualifications to help you stand out',
    //     img: "/images/skills/Student/5.png",
    //     category: this.MINT_CATEGORIES.STUDENT,
    //     profitPerHour: 150,
    //     point: 10000,
    // },
    // {
    //     name: 'Lie To Everyone And Say You Achieved An MBA',
    //     desc: 'They won\'t bother to check',
    //     img: "",
    //     category: this.MINT_CATEGORIES.STUDENT,
    //     profitPerHour: 200,
    //     point: 10000,
    // },

    // trainee
    
    {
        name: 'How to climb a tree',
        desc: 'Learn how to climb a tree',
        img: "/images/skills/Trainee/1.png",
        category: this.MINT_CATEGORIES.TRAINEE,
        profitPerHour: 40,
        point: 2000,
    },
    {
        name: 'How to catch mice',
        desc: 'Learn how to catch mice secretly',
        img: "/images/skills/Trainee/2.png",
        category: this.MINT_CATEGORIES.TRAINEE,
        profitPerHour: 50,
        point: 2000,
    },
    // {
    //     name: 'Present An Idea To Your Manger',
    //     desc: 'Think outside the box!',
    //     img: "/images/skills/Trainee/2.png",
    //     category: this.MINT_CATEGORIES.TRAINEE,
    //     profitPerHour: 100,
    //     point: 4000,
    // },
    // {
    //     name: 'Steal someone else\'s idea and present it as your own.',
    //     desc: 'You gave him that idea anyway right?',
    //     img: "",
    //     category: this.MINT_CATEGORIES.TRAINEE,
    //     profitPerHour: 120,
    //     point: 4000,
    // },
    // {
    //     name: 'Get a bonus',
    //     desc: 'A reward for all your hard work',
    //     img: "/images/skills/Trainee/3.png",
    //     category: this.MINT_CATEGORIES.TRAINEE,
    //     profitPerHour: 130,
    //     point: 6000,
    // },
    // {
    //     name: 'Steal Some Cash Left On Your Boss\'s Desk',
    //     desc: 'They\'re so rich they won\'t miss it',
    //     img: "",
    //     category: this.MINT_CATEGORIES.TRAINEE,
    //     profitPerHour: 150,
    //     point: 6000,
    // },
    // {
    //     name: 'Work overtime',
    //     desc: 'Grind and hustle to the top!',
    //     img: "/images/skills/Trainee/4.png",
    //     category: this.MINT_CATEGORIES.TRAINEE,
    //     profitPerHour: 200,
    //     point: 10000,
    // },
    // {
    //     name: 'Pretend to work overtime while actually slacking off',
    //     desc: '40 hours a week is more than enough',
    //     img: "",
    //     category: this.MINT_CATEGORIES.TRAINEE,
    //     profitPerHour: 240,
    //     point: 10000,
    // },
    // {
    //     name: 'Get a job offer',
    //     desc: 'Hard work finally pays off',
    //     img: "/images/skills/Trainee/5.png",
    //     category: this.MINT_CATEGORIES.TRAINEE,
    //     profitPerHour: 300,
    //     point: 20000,
    // },
    // {
    //     name: 'Lie on your resume and use fake references to secure the job offer.',
    //     desc: 'Whatever it takes',
    //     img: "",
    //     category: this.MINT_CATEGORIES.TRAINEE,
    //     profitPerHour: 400,
    //     point: 20000,
    // },


    // employee
    {
        name: 'Enter cat school',
        desc: 'Enter school and learn about the moon',
        img: "/images/skills/Employee/1.png",
        category: this.MINT_CATEGORIES.EMPLOYEE,
        profitPerHour: 100,
        point: 4000,
    },
    {
        name: 'Graduate cat school',
        desc: "Graduated from cat school with a bachelor's degree",
        img: "/images/skills/Employee/2.png",
        category: this.MINT_CATEGORIES.EMPLOYEE,
        profitPerHour: 150,
        point: 4000,
    },
    // {
    //     name: 'Close your first client',
    //     desc: 'Close your first client.',
    //     img: "/images/skills/Employee/2.png",
    //     category: this.MINT_CATEGORIES.EMPLOYEE,
    //     profitPerHour: 200,
    //     point: 8000,
    // },
    // {
    //     name: 'Take Credit for a Client\'s Signature',
    //     desc: 'Take Credit for a Client\'s Signature.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.EMPLOYEE,
    //     profitPerHour: 240,
    //     point: 8000,
    // },
    // {
    //     name: 'Make friends in the team',
    //     desc: 'Eat lunch together.',
    //     img: "/images/skills/Employee/3.png",
    //     category: this.MINT_CATEGORIES.EMPLOYEE,
    //     profitPerHour: 250,
    //     point: 12000,
    // },
    // {
    //     name: 'Make Rivals in the Team',
    //     desc: 'Eat their lunch from the Fridge.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.EMPLOYEE,
    //     profitPerHour: 300,
    //     point: 12000,
    // },
    // {
    //     name: 'Move closer to the office',
    //     desc: 'Get involved in the hustle and bustle.',
    //     img: "/images/skills/Employee/4.png",
    //     category: this.MINT_CATEGORIES.EMPLOYEE,
    //     profitPerHour: 400,
    //     point: 20000,
    // },
    // {
    //     name: 'Move to the Corner Desk',
    //     desc: 'They can\'t see your screens from here.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.EMPLOYEE,
    //     profitPerHour: 500,
    //     point: 20000,
    // },
    // {
    //     name: 'Get your first raise',
    //     desc: 'You can afford to start investing.',
    //     img: "/images/skills/Employee/5.png",
    //     category: this.MINT_CATEGORIES.EMPLOYEE,
    //     profitPerHour: 600,
    //     point: 40000,
    // },
    // {
    //     name: 'Lie to Prevent a Colleague\'s Raise',
    //     desc: 'Why should they earn more?.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.EMPLOYEE,
    //     profitPerHour: 800,
    //     point: 40000,
    // },
    // {
    //     name: 'Find a Senior Manager to be your mentor',
    //     desc: 'Anything we can do to help the company succeed.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.EMPLOYEE,
    //     profitPerHour: 3000,
    //     point: 30000,
    // },
    // {
    //     name: 'Talk Trash About Colleagues to your Senior Manager',
    //     desc: 'You\'ll be the obvious candidate for promotion.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.EMPLOYEE,
    //     profitPerHour: 3000,
    //     point: 30000,
    // },

    // manager
    {
        name: 'Buy a spacesuit',
        desc: 'Buy a spacesuit',
        img: "/images/skills/Manager/1.png",
        category: this.MINT_CATEGORIES.MANAGER,
        profitPerHour: 150,
        point: 8000,
    },
    {
        name: 'Learn space flight technology',
        desc: 'Learn space flight technology',
        img: "/images/skills/Manager/2.png",
        category: this.MINT_CATEGORIES.MANAGER,
        profitPerHour: 200,
        point: 8000,
    },
    // {
    //     name: 'Participate In A Management Course',
    //     desc: 'Keep your skills fresh.',
    //     img: "/images/skills/Manager/2.png",
    //     category: this.MINT_CATEGORIES.MANAGER,
    //     profitPerHour: 400,
    //     point: 16000,
    // },
    // {
    //     name: 'Pretend You Are On A Management Course While Going Out For Fancy Lunches',
    //     desc: 'Fine food to hone the mind.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.MANAGER,
    //     profitPerHour: 500,
    //     point: 16000,
    // },
    // {
    //     name: 'Hire a top sales manager',
    //     desc: 'A sharp sales team make the money.',
    //     img: "/images/skills/Manager/3.png",
    //     category: this.MINT_CATEGORIES.MANAGER,
    //     profitPerHour: 600,
    //     point: 24000,
    // },
    // {
    //     name: 'Hire An Inexperienced Friend To Do The Job',
    //     desc: 'You guys can hang out on the clock.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.MANAGER,
    //     profitPerHour: 700,
    //     point: 24000,
    // },
    // {
    //     name: 'Start a new marketing campaign',
    //     desc: 'Positive PR is crucial to success.',
    //     img: "/images/skills/Manager/4.png",
    //     category: this.MINT_CATEGORIES.MANAGER,
    //     profitPerHour: 800,
    //     point: 40000,
    // },
    // {
    //     name: 'Launch A New Marketing Campaign Based On False Promises',
    //     desc: 'Everybody lies in advertising.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.MANAGER,
    //     profitPerHour: 1000,
    //     point: 40000,
    // },
    // {
    //     name: 'Come Up With A Successful Concept',
    //     desc: 'This could help people\'s lives!.',
    //     img: "/images/skills/Manager/5.png",
    //     category: this.MINT_CATEGORIES.MANAGER,
    //     profitPerHour: 1200,
    //     point: 80000,
    // },
    // {
    //     name: 'Steal A Successful Concept From A Competitor',
    //     desc: 'A good idea is a good idea after all.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.MANAGER,
    //     profitPerHour: 1500,
    //     point: 80000,
    // },


    // Boss
    {
        name: 'Learn how to mining bitcoin',
        desc: 'Learn how to mining bitcoin',
        img: "/images/skills/Boss/1.png",
        category: this.MINT_CATEGORIES.BOSS,
        profitPerHour: 300,
        point: 16000,
    },
    {
        name: 'Explore ECAT on the moon',
        desc: 'Explore ECAT on the moon',
        img: "/images/skills/Boss/2.png",
        category: this.MINT_CATEGORIES.BOSS,
        profitPerHour: 400,
        point: 16000,
    },
    // {
    //     name: 'Give a motivational speech',
    //     desc: 'Your team is all fired up!.',
    //     img: "/images/skills/Boss/4.png",
    //     category: this.MINT_CATEGORIES.BOSS,
    //     profitPerHour: 500,
    //     point: 32000,
    // },
    // {
    //     name: 'Threaten To Fire Everyone If They Don\'t Hit Their Targets',
    //     desc: 'Actions have consequences.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.BOSS,
    //     profitPerHour: 800,
    //     point: 32000,
    // },
    // {
    //     name: 'Reward your employees',
    //     desc: 'Let them know you appreciate them - morale is key.',
    //     img: "/images/skills/Boss/1.png",
    //     category: this.MINT_CATEGORIES.BOSS,
    //     profitPerHour: 1000,
    //     point: 48000,
    // },
    // {
    //     name: 'Reward Only The Employees You Like',
    //     desc: 'The others should suck up to you more.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.BOSS,
    //     profitPerHour: 1200,
    //     point: 48000,
    // },
    // {
    //     name: 'Post record quarter results',
    //     desc: 'High revenue means high rewards.',
    //     img: "/images/skills/Boss/2.png",
    //     category: this.MINT_CATEGORIES.BOSS,
    //     profitPerHour: 1500,
    //     point: 80000,
    // },
    // {
    //     name: 'Falsify the Quarter Results To Make You Look Good',
    //     desc: 'If you look good the company looks good.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.BOSS,
    //     profitPerHour: 1800,
    //     point: 80000,
    // },
    // {
    //     name: 'Launch a successful new project',
    //     desc: 'The company is hitting new heights!.',
    //     img: "/images/skills/Boss/5.png",
    //     category: this.MINT_CATEGORIES.BOSS,
    //     profitPerHour: 2000,
    //     point: 160000,
    // },
    // {
    //     name: 'Take The Credit For Your Employee\'s Successful New Project',
    //     desc: 'You managed them, 90% of the idea was yours.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.BOSS,
    //     profitPerHour: 2500,
    //     point: 160000,
    // },

    // Millionaire
    {
        name: 'Write a book about your success',
        desc: 'Shares your secrets, but not too many.',
        img: "/images/skills/Millionaire/1.png",
        category: this.MINT_CATEGORIES.MILLIONAIRE,
        profitPerHour: 600,
        point: 32000,
    },
    {
        name: 'Become a crypto whale',
        desc: 'It\'s the future of finance after all',
        img: "/images/skills/Millionaire/2.png",
        category: this.MINT_CATEGORIES.MILLIONAIRE,
        profitPerHour: 800,
        point: 32000,
    },
    // {
    //     name: 'Buy a Lambo',
    //     desc: 'Get there fast whilst looking good.',
    //     img: "/images/skills/Millionaire/2.png",
    //     category: this.MINT_CATEGORIES.MILLIONAIRE,
    //     profitPerHour: 1500,
    //     point: 64000,
    // },
    // {
    //     name: 'Buy A Lambo To Make Your Friends Jelous',
    //     desc: 'They can have a ride if they\'re lucky.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.MILLIONAIRE,
    //     profitPerHour: 1800,
    //     point: 64000,
    // },
    // {
    //     name: 'Invest In A Business / Start Up',
    //     desc: 'Passive income is king.',
    //     img: "/images/skills/Millionaire/3.png",
    //     category: this.MINT_CATEGORIES.MILLIONAIRE,
    //     profitPerHour: 2000,
    //     point: 96000,
    // },
    // {
    //     name: 'Promise Funds To New Businesses Just To Steal Their Ideas',
    //     desc: 'The best ideas always float to the top.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.MILLIONAIRE,
    //     profitPerHour: 2500,
    //     point: 96000,
    // },
    // {
    //     name: 'Launch a luxury fashion line',
    //     desc: 'Dress good feel good.',
    //     img: "/images/skills/Millionaire/4.png",
    //     category: this.MINT_CATEGORIES.MILLIONAIRE,
    //     profitPerHour: 3000,
    //     point: 160000,
    // },
    // {
    //     name: 'Launch a \'Luxury\' Fashion Line That Uses Cheap Resources',
    //     desc: 'Saving money means making money.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.MILLIONAIRE,
    //     profitPerHour: 3500,
    //     point: 160000,
    // },
    // {
    //     name: 'Become a crypto whale',
    //     desc: 'It\'s the future of finance after all.',
    //     img: "/images/skills/Millionaire/5.png",
    //     category: this.MINT_CATEGORIES.MILLIONAIRE,
    //     profitPerHour: 5000,
    //     point: 320000,
    // },
    // {
    //     name: 'Become A Crypto Hacker',
    //     desc: 'They should\'ve read the small print.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.MILLIONAIRE,
    //     profitPerHour: 6000,
    //     point: 320000,
    // },

    // Billionaire
    {
        name: 'Buy a jet',
        desc: 'No more lines at airports.',
        img: "/images/skills/Billionaire/1.png",
        category: this.MINT_CATEGORIES.BILLIONAIRE,
        profitPerHour: 1200,
        point: 64000,
    },
    {
        name: 'Buy A Private Island',
        desc: 'Somewhere to get away from it all',
        img: "/images/skills/Billionaire/2.png",
        category: this.MINT_CATEGORIES.BILLIONAIRE,
        profitPerHour: 1500,
        point: 64000,
    },
    // {
    //     name: 'Buy A Private Island',
    //     desc: 'Somewhere to get away from it all.',
    //     img: "/images/skills/Billionaire/2.png",
    //     category: this.MINT_CATEGORIES.BILLIONAIRE,
    //     profitPerHour: 3000,
    //     point: 128000,
    // },
    // {
    //     name: 'Buy A Private Island Just To Brag',
    //     desc: 'No big deal...',
    //     img: "",
    //     category: this.MINT_CATEGORIES.BILLIONAIRE,
    //     profitPerHour: 4000,
    //     point: 128000,
    // },
    // {
    //     name: 'Set Up A Charitiable Foundation',
    //     desc: 'Helping the less fortunate.',
    //     img: "/images/skills/Billionaire/3.png",
    //     category: this.MINT_CATEGORIES.BILLIONAIRE,
    //     profitPerHour: 4800,
    //     point: 192000,
    // },
    // {
    //     name: 'Set up a tax haven',
    //     desc: 'It\'s what loopholes are for.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.BILLIONAIRE,
    //     profitPerHour: 5000,
    //     point: 192000,
    // },
    // {
    //     name: 'Own And Invest In Sports Teams To Help Them Grow',
    //     desc: 'With this investment they can win the championship.',
    //     img: "/images/skills/Billionaire/4.png",
    //     category: this.MINT_CATEGORIES.BILLIONAIRE,
    //     profitPerHour: 6000,
    //     point: 320000,
    // },
    // {
    //     name: 'Buy Sports Teams Just To Unload Debt',
    //     desc: 'Sport isn\'t about money after all.',
    //     img: "",
    //     category: this.MINT_CATEGORIES.BILLIONAIRE,
    //     profitPerHour: 8000,
    //     point: 320000,
    // },
    // {
    //     name: 'Create an AI Robot to clone yourself',
    //     desc: 'Hopefully it doesn\'t take over...',
    //     img: "/images/skills/Billionaire/5.png",
    //     category: this.MINT_CATEGORIES.BILLIONAIRE,
    //     profitPerHour: 10000,
    //     point: 640000,
    // },
    // {
    //     name: 'Build A Marble Statue Of Yourself To Have In Your Head Quarters',
    //     desc: 'Now people HAVE to look up to you',
    //     img: "",
    //     category: this.MINT_CATEGORIES.BILLIONAIRE,
    //     profitPerHour: 12000,
    //     point: 640000,
    // },
]

//----------------------------User Constants-------------------------------//

exports.USER_STATUS = {
    VERIFIED: 'verified',
    DENIED: 'denied'
}