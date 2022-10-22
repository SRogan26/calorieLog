const db = require('../../../../models');

const getUsers = async () => {
    const people = await db.person.findAll();
    const userList = people.map(person => person.dataValues)
    return userList;
};

const createUser = async (userName) => {
    await db.person.create({ name: userName });
}

const deleteUser = async (userID) => {
    await db.person.destroy({
        where: {
            person_id: userID
        }
    })
}


module.exports = { getUsers, createUser, deleteUser };