const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const path = require('path');
const app = express();
app.set('port', process.env.PORT || 3000);

app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', 
    helpers: require('./lib/handlebars')
})); 
app.set('view engine', '.hbs');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next)=>{
    next();
});



app.use(require('./routes/')); 
app.use('/crud',require('./routes/crud')); 


app.listen(app.get('port'),() => {
    console.log('Corriendo servidor en el puerto', app.get('port'));
});  