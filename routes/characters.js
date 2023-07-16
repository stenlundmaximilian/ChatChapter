const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    res.render('characters/index',{
        headerLinks:[{file:"/characters/new",
        text:"CREATE CHARACTER"}]
    })
})

router.get('/new',(req,res)=>{
    res.render('characters/new',{
        headerLinks:[{file:"/characters",
        text:"CHARACTER"}]
    })
})

module.exports = router