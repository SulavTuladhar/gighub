const express = require('express');

const router = express.Router();

router.get('/login', function(req,res,next){
    res.send('from login')
})

router.post('/login', function(req,res,next){
    res.json({
        msg: req.body
    })
})

module.exports = router;