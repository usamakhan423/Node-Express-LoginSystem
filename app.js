const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const { v4: uuidv4} = require('uuid')
const app = express()

const router = require('./router')

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.set('view engine', 'ejs')

// load static files
app.use('/static', express.static(path.join(__dirname, ('public'))))
app.use('/images', express.static(path.join(__dirname, 'public/images')))

app.use(session({
  secret: uuidv4(),
  resave: false,
  saveUninitialized: true
}))

app.use('/route', router);

app.get('/', (req, res)=> {
  res.render('base', { title:"Login System"})
})

app.listen(port, ()=> console.log(`Server listening on http://localhost:${port}`))