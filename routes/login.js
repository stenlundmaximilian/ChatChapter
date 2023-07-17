const express = require('express')
const router = express.Router()

const checkNotAuthenticated = require('../models/checkAuthentication').checkNotAuthenticated

module.exports = (passport) => {
    router.get('/',checkNotAuthenticated, (req, res) => {
      res.render('login/index', { headerLinks: [] });
    });
  
    router.post('/',checkNotAuthenticated, passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
    }));
    return router;
};
