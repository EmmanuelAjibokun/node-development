// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
// const fsPromises = require('fs').promises;
// const path = require('path');
// check for duplicate usernames in the db
// const duplicate = usersDB.users.find(person => person.username === user);
// usersDB.setUsers([...usersDB.users, newUser]);
// await fsPromises.writeFile(
//     path.join(__dirname, '..', 'model', 'users.json'),
//     JSON.stringify(usersDB.users)
// )
// console.log(usersDB.users)

const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd)  return res.status(400).json({ 'message': 'Username and password are required.'});

    const duplicate = await User.findOne({ username: user }).exec(); // returns the user that matches identified username
    if (duplicate) return res.sendStatus(409); // conflict

    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // Create and store the new user
        const result = await User.create({ 
            "username": user,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({'success': `New user ${user} created!`})
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = { handleNewUser };