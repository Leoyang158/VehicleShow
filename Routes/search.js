const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {  
    res.render('Info/search')
});


router.post('/', (req, res) => {
    // res.render('info/search')
    res.send(req.body)
    // const { password, username } = req.body
    // res.send(password)
    // res.send(username)
});


module.exports = router;