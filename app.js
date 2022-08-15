const express = require('express')


const app = express()

//View Engine and Use options
app.set('view engine', 'ejs')
app.use(express.static('css'))
app.use(express.urlencoded({ extended: true }));


//Routes
app.get('/', function(req,res){
    res.render('login')
})












//Listener

app.listen(3000, function(){
    console.log("App running on port 3000")
})