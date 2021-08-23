const express = require('express')
const path = require('path')
const hbs = require('hbs')
require('./db/mongoose')
const User = require('./model/user-model')
const bodyParser = require('body-parser')

const CircularJSON = require('circular-json')

const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
const publicDirectoryPath = path.join(__dirname, '../public')


app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')

const viewsPath = path.join(__dirname, '../public')
app.set('views', viewsPath)


app.get('', (req, res) => {
    res.render('index')
})


app.get('/signup', (req, res) => {
    res.render('signup')
})


// sign up function
app.post('/register', (req, res) => {
    const user1 = {
        name : req.body.username,
        email : req.body.emailId,
        password : req.body.password,
        phoneNumber : req.body.phoneNumber,
        gender : req.body.Gender
    }    
    const user = new User(user1)
    User.find({email:req.body.emailId },(error, users) => {
        if(error){
            return res.send('Something went wrong...')
        }
        console.log(users)
        var count = Object.keys(users).length;

        if(count == 1){
            res.send( '<h1>Already EmailId exist try new one...</h1>' )
        }
        else{
            user.save().then(() => {
                res.status(201)
                res.redirect('success_page')
            }).catch((e) => {
                res.status(400).send(e)
            })
        }
     })

    
})

app.get('/success_page', (req, res) => {
    res.render('success_page')
})

app.get('/signin',(req, res) => {
    res.render('signin')
})


// sign in function
app.post('/user_signin', (req, res) => {
    User.find({email:req.body.emailId, password:req.body.password},(error, user) => {
        if(error){
            return console.log('error')
        }
        console.log(user)
        var count = Object.keys(user).length;

        if(count == 1){
            res.send( '<h1>User found</h1>' )
        }
        else{
            res.send('<h1>user not found</h1>')
        }
     })
})

app.listen(port, () => {
    console.log('server starting...' + port) 
})