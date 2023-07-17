const express = require('express')
const router = express.Router()

const checkAuthenticated = require('../models/checkAuthentication').checkAuthenticated

router.get('/',checkAuthenticated,(req,res)=>{
    res.render('characters/index',{
        headerLinks:[{file:"/characters/new",
        text:"CREATE CHARACTER"}]
    })
})

router.get('/new',checkAuthenticated,(req,res)=>{
    res.render('characters/new',{
        headerLinks:[{file:"/characters",
        text:"CHARACTER"}]
    })
})

module.exports = router