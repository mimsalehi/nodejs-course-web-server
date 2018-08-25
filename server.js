const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// c:/Users/Zero One/Desktop/roxo/nodejs/node-web-server
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'hbs');


app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.writeFileSync('server.log', log + '\n')
    next();
})

app.use((req, res, next)=>{
    res.render('offline.hbs')
})

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
})

hbs.registerHelper('upperCase', (text)=>{
    return text.toUpperCase();
})
// GET POST PUT PATCH DELETE ---------> Http Request
// http://www.roxo.ir/vuejs ---> GET Request
// localhost:3000
app.get('/', (req, res) =>{
    // res.send('<h1>Hello Express</h1>')
    res.render('home.hbs',{
        pageTitle: 'صفحه اصلی سایت',
        welcomeMessage: 'Welcome to roxo',
    })
})

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'صفحه درباره ما',
    })
})

app.get('/bad', (req, res)=>{
    res.send({
        error: 'Unable to fetch data'
    })
})

app.listen(3000, ()=>{
    console.log('Server run on Port 3000')
});