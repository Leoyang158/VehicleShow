const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('Info/login')
})

module.exports = router;