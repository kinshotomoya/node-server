const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

// partial化することができる
hbs.registerPartials(__dirname + '/views/partials')
// view engineを設定
app.set('view engine', 'hbs');
// useはミドルウェアを使うときに使う
// ログを残す
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to file');
        }
    });
    next();
})

// メンテナンスする
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

// __dirname == /Users/jinzhengpengye / work_space / node_project / node - web - server
app.use(express.static(__dirname + '/public'));

// helperを設定することができる
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

// 引数をとって、helperに登録することもできる
hbs.registerHelper('screenIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'welcome to my page'
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'unale to handle request'
    });
});

app.listen(3000, () => {
    console.log(`server is up on port ${port}`);
});
