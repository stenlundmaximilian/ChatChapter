const express = require('express')
const router = express.Router()
const Story = require('../models/story')

const checkAuthenticated = require('../utils/checkAuthentication').checkAuthenticated

router.get('/',checkAuthenticated,async(req,res)=>{
    try{
        const stories = await Story.find({createdBy:req.user._id})
        res.render('stories/index',{
            headerLinks:[
                {file:"/",text:"HOME"}  
            ],
            stories:stories
        })
    }catch(err){
        console.error(err)
    }
})

router.get('/edit',checkAuthenticated,(req,res)=>{
    // Retrieve the data from the query parameters
    // Access the 'title' value
    const title = req.query.title;

    // Access the 'story' value as a JSON string and parse it back into an object
    const storyJSON = req.query.story;
    const story = JSON.parse(storyJSON);
    const imageURL = req.query.imageURL;
    const id = req.query.id
    res.render('stories/edit',{
        headerLinks:[
            {file:"/",text:"HOME"}
        ],
        title:title,
        story:story,
        imageURL:imageURL,
        id:id
    })
})

router.post('/edit', checkAuthenticated, async (req, res) => {
    try{
        const title = req.body.title
        const id = req.body.id
        const updatedStory = await Story.findByIdAndUpdate(id, {title}, { new: true });
        res.redirect('/stories')
    }
    catch(error){
        res.status(500).send('Error editing character')
    }
});

router.delete('/:id',async (req,res)=>{
    try{
        const storyIdToDelete = req.params.id
        await Story.deleteOne({_id:storyIdToDelete})
        res.redirect('/stories')
    }
    catch(error){
        res.status(500).send('Error deleting character')
    }
})

module.exports = router