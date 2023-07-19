const express = require('express')
const router = express.Router()
const Character = require('../models/character')

const checkAuthenticated = require('../models/checkAuthentication').checkAuthenticated

router.get('/',checkAuthenticated,async(req,res)=>{
    try{
        const characters = await Character.find({createdBy:req.user._id})
        res.render('characters/index',{
            headerLinks:[{file:"/characters/new",
                        text:"CREATE CHARACTER"}],
            characters:characters
        })
    }catch(err){
        console.error(err)
    }
})

router.get('/new',checkAuthenticated,(req,res)=>{
    res.render('characters/new',{
        headerLinks:[{file:"/characters",
        text:"CHARACTER"}]
    })
})

router.post('/',checkAuthenticated,async (req, res) => {
    try{
        const character = new Character({
            name: req.body.name,
            hobby: req.body.hobby,
            trait: req.body.trait,
            createdBy: req.user._id
        })
        const newCharacter = await character.save()
        res.redirect('/characters')
    } catch{
        res.redirect('/characters/new')
    }
});

module.exports = router