const express = require('express')
const router = express.Router()

module.exports = (passport) => {
    router.get('/', (req, res) => {
      res.render('login/index', { headerLinks: [] });
    });
  
    router.post('/', passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
    }));
    return router;
};
