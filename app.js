const { info } = require('console')
const express = require('express')
const mongoose = require('mongoose')
const path = require("path")

const app = express()

// Plan notes:
// 1. Config userDB so it can take info
// 1.1 Test functionality of taking users 
// 1.2 Make diff pages for Login and Register
// 2. Add some encryption (Looking at passport but may consider other follwing some google)
// 2.1 Test encryption works 
// 3. Config how pages will be presented

//View Engine and Use options
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

// Mongoose and DB settings
mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser:true})

const newUserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    
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
        userProfile.find({username: req.body.username}, function(err, foundUser){
            if (err) {
                console.log(err)
                res.render(err)
            } else {
                if (foundUser) {
                    if (foundUser.password === req.body.password) {
                        console.log("This has been logged in")
                        res.redirect("home")
                    } else {
                        res.redirect('/')
                    }
                }
            }

        })
        //Post checks the databases for this info a redirects if it is true. If false, a window/pan will appear telling the userr they have failed 
        
    })

app.route('/register')
    .get(function(req,res){
        res.render('register')
    })
    .post(function(req,res){
        console.log(req.body)
        const newUser = new userProfile({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        userProfile.findOne({email: newUser.email, username: newUser.username}, function(err, foundUsers){
            if (!foundUsers) {
                newUser.save(function(err){
                    if (err) {
                        console.log(err)
                    } else {
                        res.redirect("/")
                    }
                })
            }
            
            else{ if (foundUsers.email != newUser.email) {
                    if (foundUsers.username != newUser.username){
                        newUser.save(function(err){
                            if (err) {
                                console.log(err)
                            } else {
                                res.redirect("/")
                            }
                        })
                        
                    }

            }
                
             
            //Activate Spans on the page and redirect back to the page to reset.
            //Need to confirm on page if registration has been logged. 
            //If user already exists - show err,
            //Else confirm the registation
                }

        
    })
    })
app.route('/home')
    .get(function(req, res){
        res.render('home')
    })










//Listener

app.listen(3000, function(){
    console.log("App running on port 3000")
})