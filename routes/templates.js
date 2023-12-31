const express = require('express')
const router = express.Router()
const Character = require('../models/character')
const Story = require('../models/story')

const checkAuthenticated = require('../utils/checkAuthentication').checkAuthenticated
const fetchData = require('../utils/chatGPT')
const stableDiffusionData = require('../utils/stableDiffusion').stableDiffusionData2

router.get('/',checkAuthenticated,async(req,res)=>{
    try{
        const characters = await Character.find({createdBy:req.user._id})
        res.render('templates/index',{
            headerLinks:[
                {file:"/",text:"HOME"}
            ],
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
    res.render('templates/generate',{
        headerLinks:[
            {file:"/",text:"HOME"},
        ],
        _id1:_id1,
        _id2:_id2,
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


const imagePrompts = {
    "Pirate Adventure":"Digital art pirate ship harbor",
    "Space Travel":"Digital art space travel",
    "Cowboy Rodeo":"Digital art cowboy town",
    "Deep Sea Exploration":"Digital art deep sea exploration",
    "Enchanted Forest": "Digital art mystical forest realm",
    "Time Travelers": "Digital art time-traveling adventurers",
    "Steampunk Airship": "Digital art steampunk airship city",
    "Underground Caves": "Digital art mysterious underground caves",
    "Mythical Creatures": "Digital art epic mythical creature showdown",
    "Wild West Duel": "Digital art intense Wild West dueling",
    "Robotic Rebellion": "Digital art futuristic robotic uprising",
    "Ancient Ruins": "Digital art ancient civilization ruins",
    "Magical Academy": "Digital art enchanted magical academy",
    "Alien Encounter": "Digital art thrilling alien encounter"          
}
router.get('/generateImage',checkAuthenticated,async (req,res)=>{
    try{
        //const _id1 = req.query._id1;
        //const _id2 = req.query._id2;
        const title = req.query.title;
        //const character1 = await Character.findById(_id1)
        //const character2 = await Character.findById(_id2)
        const prompt = imagePrompts[title]
        const imageURL = await stableDiffusionData(prompt)
        res.send(imageURL)
    } catch(err){
        console.error(err);
    }
})

router.post('/stories', checkAuthenticated, async (req, res) => {
    try {
      const story = JSON.parse(req.body.story);
      const title = req.body.title; // Get the title from the request
      const imageURL = req.body.imageURL;
      const storyObject = new Story({
        title: title,
        story: story,
        imageURL: imageURL,
        createdBy: req.user._id
      });
      const newStory = await storyObject.save();
      res.redirect('/stories');
    } catch (error) {
      console.error(`Error while saving story with title '${title}':`, error);
      res.redirect('/templates');
    }
  });
  

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