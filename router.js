var express = require('express')
var router = express.Router();

const Credential = {
  email: 'uk@gmail.com',
  password: 'admin123'
}

router.post('/login', (req, res)=> {
  if(req.body.email == Credential.email && req.body.password == Credential.password){
    req.session.user = req.body.email
    res.redirect('/route/dashboard')
    // res.end('Login Successfully!')
  }else {
    // res.end('Invalid username...')
    if(req.session.email != Credential.email && req.session.password != Credential.password){
      res.render('errorMessage')
    }else {
      res.send('Something went wrong!')
    }
  }
})

router.get('/dashboard', (req, res)=> {
  if(req.session.user){
    res.render('dashboard', {user: req.session.user})
  }else {
    res.send('Unathorized user!')
  }
})

router.get('/logout', (req, res)=> {
  res.render('logout')
})

module.exports = router