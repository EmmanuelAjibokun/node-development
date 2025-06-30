// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
// const fsPromises = require('fs').promises
// const path = require('path')
// Saving refreshToken with current user
// const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
// const currentUser = {...foundUser, refreshToken};
// usersDB.setUsers([...otherUsers, currentUser])
// await fsPromises.writeFile(
//     path.join(__dirname, '..', 'model', 'users.json'),
//     JSON.stringify(usersDB.users)
// )

const User = require('../model/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.'});

    const foundUser = await User.findOne({ username: user}).exec();
    if (!foundUser) return res.status(401).json({ 'message': 'User does not exist'}); // Unauthorized

    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);

        // create JWTs
        const accessToken = jwt.sign(
            { "UserInfo": { 
                "username": foundUser.username,
                "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60s'}
        );

        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d'}
        );

        const result = await User.findOneAndUpdate(
            { username: user },
            { refreshToken: refreshToken },
            { new: true }
        );

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 }); // note: set 'secure' to 'false' for thunder man client to work.
        res.json({ accessToken }); // in production: send the roles too, to keep the frontend aware
    } else {
        res.sendStatus(401)
    }
}

module.exports = { handleLogin };