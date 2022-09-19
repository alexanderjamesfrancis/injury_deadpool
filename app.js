const { info } = require('console')
const express = require('express')
const mongoose = require('mongoose')
const path = require("path")
const passport = require("passport")
const passportLocalMongoose = require('passport-local-mongoose')
const session = require('express-session')
const passport = require('passport')

const app = express()

// Plan notes:
// 1. Config userDB so it can take info !tick!
// 1.1 Test functionality of taking users  !tick!
// 1.2 Make diff pages for Login and Register !tick!
// 2. Add some encryption (Looking at passport but may consider other follwing some google)
// 2.1 Test encryption works 
// 3. Config how pages will be presented

//View Engine and Use options
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

// Passport and Sessions

app.use(session({
    secret:'Thisisthesecretkey',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

// Mongoose and DB settings
mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser:true})

const newUserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
})

newUserSchema.plugin(passportLocalMongoose)

const userProfile = mongoose.model(
    "userProfile", newUserSchema
)

passport.use(userProfile.createStrategy())

passport.serializeUser(userProfile.serializeUser())
passport.deserializeUser(userProfile.deserializeUser())

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
                        res.redirect("/home")
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
        const newUser = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
        userProfile.findOne({email: newUser.email, username: newUser.username}, function(err, foundUsers){
            if (!foundUsers) {
                userProfile.register(newUser,function(err){
                    if (err) {
                        console.log(err)
                        res.redirect('/register')
                    } else {
                        passport.authenticate('local')(req,res, function(){
                            console.log('This has works')
                            res.redirect("/")
                        })
                        
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