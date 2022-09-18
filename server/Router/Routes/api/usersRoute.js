const express = require("express");
const router = express.Router();
const {getUsers, createUser, deleteUser} = require('./controllers/usersCont');

router.get('/', async (req, res)=> {
    const userList = await getUsers();
    res.status(200).json(userList);
});

router.post('/', async (req, res)=> {
    await createUser(req.body.name);
    res.status(200).json({"message": `${req.body.name} added as a user!`});
});

router.delete('/', async (req, res) => {
    await deleteUser(req.body.id);
    res.status(200).json({"message": `User deleted!`});
})
module.exports = router;