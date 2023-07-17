const express = require('express')
const router = express.Router()

const checkAuthenticated = require('../models/checkAuthentication').checkAuthenticated

router.get('/',checkAuthenticated,(req,res)=>{
    res.render('templates/index',{
        headerLinks:[]
    })
})

module.exports = router