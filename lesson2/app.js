/*
Вам потрібно реалізувати мінімум 3 строрінки.
1) Реєстрація
2) Логінація.
3) Список всіх юзерів.

Створити файлик з юзерами, який буде виступати в ролі бази данних.

При реєстрації юзер вводин логін та пороль і ви його данні дописуєте у файлик.
Якщо такий мейл вже є, то видаємо помилку.

При логінації юзер так само ввоить мейл та пароль і вам необхідно знайти юзера в файлі. Якщо такий мейлик з таким паролем є, то привіти юзера на платформі показати інформацію про нього та кнопочку, яка перекине нас на список всіх юзерів.
В інакшому випадку сказати, що необхідно реєструватись.

І відображення всіх юзерів це відповідно просто виведення списку вісх юзерів.

При реєстрації мейли не можуть повторюватись
Показати менше
 */
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const db = require('./db.json');
const filePath = path.join(process.cwd(), 'bd.json');
let userLog = false;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', hbs({ defaultLayout: false }));

app.set('static', path.join(process.cwd(), 'static'));

app.get('/', (req, res) => {
    res.render('registration');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/rejection', (req, res) => {
    res.render('rejection', { reject });
});

app.get('/users', (req, res) => {
    if (userLog) {
        return res.render('users', { db, userLog });
    }
    res.redirect('/rejection');
});

app.post('/registration', (req, res) => {
    const { name, email, password } = req.body;

    db.forEach((user) => {
        if (user.name === name || user.email === email) {
            reject ='Write another email or password' ;
            res.redirect('/rejection');
        }
    });

    db.push({ name, email, password });
    const dbUsers = JSON.stringify(db);

    fs.writeFile(filePath, newUsers, err => {
        if (err) {
            throw err;
        }
    })
    userLog = true;
    res.redirect('/users');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.forEach((user) => {
        if (user.email === email && user.password === password) {
            user = true;
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