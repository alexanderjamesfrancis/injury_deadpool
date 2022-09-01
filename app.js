const express = require('express')
const mongoose = require('mongoose')
const path = require("path")

const app = express()

//View Engine and Use options
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

// Mongoose and DB settings
mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser:true})

const newUserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
})

const userProfile = mongoose.model(
    "userProfile", newUserSchema
)

//Routes
app.route('/')
    .get(function(req,res){
        res.render('login')
    })

    .post(function(req,res){
        //Post checks the databases for this info a redirects if it is true. If false, a window/pan will appear telling the userr they have failed 
        res.redirect('login')
    })

app.route('/register')
    .get(function(req,res){
        res.render('register')
    })
    .post(function(req,res){
        const newUser = new userProfile({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        userProfile.find({}, function(err, foundUsers){
            //If user already exists - show err,
            //Else confirm the registation
        })

        res.redirect('register')
    })












//Listener

app.listen(3000, function(){
    console.log("App running on port 3000")
})