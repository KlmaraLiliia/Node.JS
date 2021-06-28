const express =require ('express');
const expressHbs= require('express-handlebars');
const path= require('path');
const app =express ();
const fs = require('fs');
const db = require('./db.json');
const filePath = path.join(process.cwd(), 'bd.json');
let userLog = false;
const rejectMsg ='Write another email or password' ;

app.use(express.static(path.join(__dirname,'static')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.static(path.join(process.cwd(), 'static')));

app.set('myPages engine', '.hbs');
//app.engine('.hbs', expressHbs({ defaultLayout: false }));


//app.set('views', path.join(process.cwd(), 'static'));

app.get('/', (req, res) => {
    res.render('registration');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/rejection', (req, res) => {
    res.render('rejection', { rejectMsg });
});

app.get('/users', (req, res) => {
    if (userLog) {
        return res.render('users', { db, userLog });
    }
    res.redirect('/rejection');
});

app.post('/registration', (req, res) => {
    const { name, email, password } = req.body;

    db.forEach((users) => {
        if (users.name === name || users.email === email) {
            res.redirect('/rejection');
        }
    });

    db.push({ name, email, password });
    const dbUsers = JSON.stringify(db);

    fs.writeFile(filePath, dbUsers, err => {
        if (err) {
            throw err;
        }
    })
    userLog = true;
    res.redirect('/users');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.forEach((users) => {
        if (users.email === email && users.password === password) {
            userLog = true;
            res.redirect('/users');
        }
    });
    res.redirect('/rejection');
});

app.post('/logout', (req, res) => {
    userLog = false;
    res.redirect('/login');
});

app.listen(3000,()=>{
    console.log("App listen 3000")
});