
//imports
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

//import routes
const indexRouter = require('./routes/index')
const characterRouter = require('./routes/characters')
const templateRouter = require('./routes/templates')

//app set/use
app.set('view engine', 'ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(expressLayouts)
app.use(express.static('public'))

//app set/use routes
app.use('/',indexRouter)
app.use('/characters',characterRouter)
app.use('/templates',templateRouter)

app.listen(process.env.PORT || 3000)