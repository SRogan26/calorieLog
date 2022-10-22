const express = require("express");
const router = express.Router();
const {getUsers, createUser, deleteUser} = require('./controllers/usersCont');

router.get('/', async (req, res)=> {
    const userList = await getUsers();
    res.json({data: userList});
});

router.post('/', async (req, res)=> {
    await createUser(req.body.name);
    res.status(200).json({"message": `${req.body.name} added as a user!`});
});

router.delete('/:id', async (req, res) => {
    await deleteUser(req.params.id);
    res.status(200).json({"message": `User deleted!`});
})
module.exports = router;