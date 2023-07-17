const express = require('express')
const router = express.Router()

const checkAuthenticated = require('../models/checkAuthentication').checkAuthenticated


const headerLinks = [{file:"/characters",text:"CHARACTERS"}
                    ,{file:"/templates",text:"TEMPLATES"}]

router.get('/',checkAuthenticated,(req,res)=>{
    res.render('index',{headerLinks})
})

module.exports = router