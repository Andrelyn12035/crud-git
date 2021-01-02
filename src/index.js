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





const sgMail = require("@sendgrid/mail");
require('dotenv').config();
console.log(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg ={
        to: ["krandym1993@hotmail.com", "kevo1803wow@gmail.com"],
        from: "savestudios@onclass.online",
        subject: "Aber",
        text: "Texto",
        html: `<strong>Eesto es <h1>HTML</h1></strong>
        `
    }

var schedule = require('node-schedule');
 
schedule.scheduleJob('*/15 * * * *', function(){
    
    sgMail.send(msg).then(()=> {
        console.log('enviado');
    }).catch((error) => {
        console.error(error);
    });
    console.log('The answer to life, the universe, and everything!');
});

app.listen(app.get('port'),() => {
    console.log('Corriendo servidor en el puerto', app.get('port'));
});  