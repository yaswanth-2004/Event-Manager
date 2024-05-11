const express = require('express');

const router = express.Router();

router.post('/login',  (req, res) => {
    try {
        const { username, password, role } = req.body;
        // const newAdmin = await Admin.create({
        //     username,
        //     password,
        //     role
        // });

        console.log(req.body)

        return res.json(newAdmin);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router