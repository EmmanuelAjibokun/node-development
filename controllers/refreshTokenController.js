// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
// const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);

const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    console.log("refreshToken", cookies)
    if (!cookies ?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.status(403).json({ 'message': 'refresh token not found'}); // Forbidden: token not found

    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403); // mismatch between user's signed refreshToken and user's refreshToken gotten from db
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": { 
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60s' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken };