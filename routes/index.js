const express = require('express')
const router = express.Router()
const headerLinks = [{file:"/characters",text:"CHARACTERS"}
                    ,{file:"/templates",text:"TEMPLATES"}]

router.get('/',(req,res)=>{
    res.render('index',{headerLinks})
})

module.exports = router