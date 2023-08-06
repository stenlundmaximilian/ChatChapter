const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const router = express.Router()

const checkNotAuthenticated = require('../utils/checkAuthentication').checkNotAuthenticated

router.get('/',checkNotAuthenticated,(req,res)=>{
  res.render('register/index',{headerLinks:[]})
})

router.post('/',checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    const newUser = await user.save()
    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }
});

module.exports = router

