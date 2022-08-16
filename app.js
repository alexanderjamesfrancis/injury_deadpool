const express = require('express')
const path = require("path")

const app = express()

//View Engine and Use options
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));


//Routes
app.get('/', function(req,res){
    res.render('login')
})












//Listener

app.listen(3000, function(){
    console.log("App running on port 3000")
})