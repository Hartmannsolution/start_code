// This is a demo file to run with `npm run demo` from the node-api container, to test concepts and get immidiate feedback:
const mongoose = require('mongoose');
const { User } = require('./models/user');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)

run();
async function run() {
    // createUser();
    // findAllUsers();
    // findUserById('6401c326e457154b3ce9fb66');
    selectStuff();
}
async function selectStuff() {
    // const user = User.find({email:'danny@webmail.com'});
    // console.log(user.name);
    User.findOne({ name: 'Jack Smith' }, (err, user) => {
        if (err) { console.log('Error:', err); return; }
        if (!user) { console.log('User not found'); return; }
        console.log('Found One:', user);
    });

    User.find({ name: 'Holger Danske den syvende' }, (err, users) => {
        if (err) { console.log('Error:', err); return; }
        console.log('Found Holger by name: ', users);
    });

    const query = User.find({ name: 'Holger Danske den syvende' }).limit(2).sort({ createdAt: -1 }).populate('address');
    data = await query.exec();
    console.log('DATA: ', data);

    // Find all users with a name containing 'dansk' (case insensitive)
    User.find({ name: { $regex: /dansk/i } }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log('Users with Danske: ', users);
        }
    });

    // mix of regex and string searches
    const excludedNames = ['Jack Smith', 'Jane Doe', 'John Doe', 'Holger Danske den syvende','daniel',/victor/i,/hans/i];
    const query2 = { name: { $nin: excludedNames } };

    User.find(query2, (err, users) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Users not in the list: ',users);
        }
    });


}

async function findAllUsers() {
    User.find(function (err, users) {
        if (err) return console.error(err);
        console.log(users);
    });
}

async function findUserById(id) {
    User.findById(id, function (err, user) {
        if (err) return handleError(err);
        console.log('The user is %s', user.name);
    });
}

async function createUser() {
    const user = new User({
        name: 'Victor Hartmann',
        email: 'victor@cphbusiness.dk',
        password: '123456',
        dateOfBirth: new Date('1990-05-24'),
        address: '5f9f1b0b1b1b1b1b1b1b1b1b',
        hobbies: ['football', 'tennis', 'swimming'],
        phone: {
            no: '12345678',
            description: 'mobile'
        }
    });
    await user.save();
}

