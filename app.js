const { info } = require('console')
const express = require('express')
const mongoose = require('mongoose')
const path = require("path")
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const passportLocalMongoose = require('passport-local-mongoose')
const session = require('express-session')




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
app.use(express.urlencoded({extended: true}));


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



const userProfile = mongoose.model(
    "userProfile", newUserSchema
)
passport.use(new LocalStrategy(
    function(username, password, email, done) {
        userProfile.findOne({username: username, email: email}, function (err, user){
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false)
            }
            if (!email) {
                return done(null, false)
            }
            if (!user.verifyPassword(password)) {
                return done(null, false)
            }

        })
    }
))

passport.serializeUser(userProfile.serializeUser())

passport.deserializeUser(userProfile.deserializeUser())

userProfile.plugin(passportLocalMongoose, options)

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
        userProfile.register({email:newUser.email}, newUser.password, function(err, user) {
            if (err) { console.log(err) }
          
            const authenticate = userProfile.authenticate();
            authenticate(newUser.username, newUser.password, function(err, result) {
              if (err) { console.log(err) }
          
              // Value 'result' is set to false. The user could not be authenticated since the user is not active
            });
          });
       



       

        
    })
    
app.route('/home')
    .get(function(req, res){
        res.render('home')
    })










//Listener

app.listen(3000, function(){
    console.log("App running on port 3000")
})