const multer = require('multer');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
    next();
});
app.use(multer().array(), (req, res, next) => {
    next();
  });

app.get('/', (req, res) => res.send('App is working::::'));
app.use('/product_images', express.static('product_images'));
app.use('/api', routes);

const port =require('./common/config.json').port;
app.listen(port, () => console.log(`App listening on port ${port}!`));