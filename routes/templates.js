const express = require('express')
const router = express.Router()
const Character = require('../models/character')

const checkAuthenticated = require('../models/checkAuthentication').checkAuthenticated
const fetchData = require('../models/chatGPT')
const stableDiffusionData = require('../models/stableDiffusion')

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

router.get('/generate',checkAuthenticated,async(req,res)=>{
    const _id1 = req.query.character1
    const _id2 = req.query.character2
    const title = req.query.title
    console.log(title)
    imageURL = await stableDiffusionData(process.env.STABLE_DIFFUSION_API_KEY)
    console.log(imageURL)
    res.render('templates/generate',{
        headerLinks:[],
        _id1:_id1,
        _id2:_id2,
        imageURL:imageURL,
        title:title
    })
})

router.get('/generateMessage',checkAuthenticated,async (req,res)=>{
    try{
        const _id1 = req.query._id1;
        const _id2 = req.query._id2;
        const title = req.query.title;
        const character1 = await Character.findById(_id1)
        const character2 = await Character.findById(_id2)
        const message = await fetchData(process.env.API_KEY,character1,character2,title)
        const paragraphs = message.split("\n").filter(Boolean);
        res.send(paragraphs)
    } catch(err){
        console.error(err);
    }
})

module.exports = router

        //const message = `
//===============================
//   Welcome to Console Page   
//===============================
//
//Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec tortor quis erat semper aliquam.
//Suspendisse luctus quam vel nunc sagittis vestibulum. Nullam auctor euismod fringilla. Sed ac nulla ac massa congue suscipit.
//
//Phasellus et mi vitae nulla rhoncus auctor. Aenean fermentum laoreet eros ac efficitur. Nullam ut aliquam dui, at blandit arcu.
//Quisque ultrices ipsum at odio tristique fringilla. Donec bibendum, tortor et tincidunt rutrum, turpis tellus bibendum augue, id pharetra turpis ligula non dolor.
//
//===============================
//          Contact Us          
//===============================
//Email: contact@example.com
//Phone: +1 (555) 123-4567
//
//Thank you for visiting!
//`    