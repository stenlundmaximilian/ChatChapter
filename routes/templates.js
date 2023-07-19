const express = require('express')
const router = express.Router()
const Character = require('../models/character')

const checkAuthenticated = require('../models/checkAuthentication').checkAuthenticated

router.get('/',checkAuthenticated,async(req,res)=>{
    try{
        const characters = await Character.find({createdBy:req.user._id})
        res.render('templates/index',{
            headerLinks:[],
            characters:characters
        })
    } catch(err){
        console.error(err)
    }
})

module.exports = router