const express = require('express')
const router = express.Router()
const Character = require('../models/character')

const checkAuthenticated = require('../utils/checkAuthentication').checkAuthenticated

router.get('/',checkAuthenticated,async(req,res)=>{
    try{
        const characters = await Character.find({createdBy:req.user._id})
        res.render('characters/index',{
            headerLinks:[
                {file:"/",text:"HOME"},
                {file:"/characters/new",text:"CREATE CHARACTER"}
            ],
            characters:characters
        })
    }catch(err){
        console.error(err)
    }
})

router.get('/new',checkAuthenticated,(req,res)=>{
    res.render('characters/new',{
        headerLinks:[
            {file:"/",text:"HOME"},
            {file:"/characters",text:"CHARACTER"}
        ]
    })
})

router.get('/edit',checkAuthenticated,(req,res)=>{
    // Retrieve the data from the query parameters
    const { name, hobby, trait, _id } = req.query
    res.render('characters/edit',{
        headerLinks:[
            {file:"/",text:"HOME"},
            {file:"/characters", text:"CHARACTER"}
        ],
        character:  {
            name:name,
            hobby:hobby,
            trait:trait,
            _id: _id
        }
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

router.put('/:id',async (req,res)=>{
    try{
        const _id = req.params.id
        const { name, hobby, trait} = req.body;
        const updatedCharacter = await Character.findByIdAndUpdate(_id, { name, hobby, trait }, { new: true });
        res.redirect('/characters')
    }
    catch(error){
        res.status(500).send('Error editing character')
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const characterIdToDelete = req.params.id
        await Character.deleteOne({_id:characterIdToDelete})
        res.redirect('/characters')
    }
    catch(error){
        res.status(500).send('Error deleting character')
    }
})

module.exports = router