const db = require('../database/dbConfig')

module.exports = {
    addUser,
    findUser
}

function addUser(user) {
    return db('users')
        .insert(user, "id")
}

function findUser(user) {
    return db('users')
        .where('users.username', user)
        .first()
}