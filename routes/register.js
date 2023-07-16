const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()

router.get('/',(req,res)=>{
    res.render('register/index',{headerLinks:[]})
})

module.exports = (users) => {
    router.post('/', async (req, res) => {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
          id: Date.now().toString(),
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        });
        res.redirect('/login');
      } catch {
        res.redirect('/register');
      }
    });
    return router;
  };
