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

app.route('/register')
    .get(function(req,res){
        res.render('register')
    })












//Listener

app.listen(3000, function(){
    console.log("App running on port 3000")
})