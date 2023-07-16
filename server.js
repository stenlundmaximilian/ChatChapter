if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

//imports
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

//import routes
const indexRouter = require('./routes/index')
const characterRouter = require('./routes/characters')
const templateRouter = require('./routes/templates')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')

//import function to initialize passport
const initializePassport = require('./models/passportConfig')

//initialize passport
initializePassport(
    passport,
    email=>users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

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
app.use('/login',loginRouter)
app.use('/register',registerRouter)

app.listen(process.env.PORT || 3000)