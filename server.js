if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

//imports
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

//import routes
const indexRouter = require('./routes/index')
const characterRouter = require('./routes/characters')
const templateRouter = require('./routes/templates')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const logoutRouter = require('./routes/logout')

//import function to initialize passport
const initializePassport = require('./models/passportConfig')

//initialize passport
async function getUserByEmail(email) {
    try {
      const user = await User.findOne({ email: email });
      return user; // Returns null if no user is found with the specified email.
    } catch (error) {
      // Handle the error appropriately.
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  async function getUserById(userId) {
    try {
      const user = await User.findById(userId);
      return user; // Returns null if no user is found with the specified ID.
    } catch (error) {
      // Handle the error appropriately.
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

initializePassport(
    passport,
    getUserByEmail,
    getUserById
)

//const users = []
const User = require('./models/user')

//app set/use
app.set('view engine', 'ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//app set/use routes
app.use('/',indexRouter)
app.use('/characters',characterRouter)
app.use('/templates',templateRouter)
app.use('/login',loginRouter(passport))
app.use('/register',registerRouter)
app.use('/logout',logoutRouter)

//mongoose database
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.log('Connected to Mongoose'))

app.listen(process.env.PORT || 3000)