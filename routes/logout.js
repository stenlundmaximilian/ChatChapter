const express = require('express')
const router = express.Router()

router.delete('/',(req,res)=>{
    req.logout((err) => {
        try{
            res.redirect('/login')
        } catch(e){
            console.error('Error during logout:', e);
        }
    })
})

module.exports = router