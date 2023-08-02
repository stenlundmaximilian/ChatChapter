const express = require('express')
const router = express.Router()

const checkAuthenticated = require('../models/checkAuthentication').checkAuthenticated


const headerLinks = [
                    {file:"/",text:"HOME"},
                    {file:"/characters",text:"CHARACTERS"},
                    {file:"/templates",text:"TEMPLATES"},
                    {file:"/stories",text:"STORIES"},
                    ]

router.get('/',checkAuthenticated,(req,res)=>{
    res.render('index',{headerLinks})
})

module.exports = router