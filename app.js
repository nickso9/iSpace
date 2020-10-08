const session = require('express-session')
const express = require('express')
const exphbs = require('express-handlebars')
const passport = require('passport')
const path = require('path')
const flash = require('connect-flash')
const app = express()
require('./config/passport')(passport)
const db = require("./models");
const fileUpload = require('express-fileupload');




app.engine('handlebars', exphbs({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')



app.use(express.urlencoded({ extended: true}))
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true}));
app.use(passport.initialize())
app.use(passport.session())

app.use(fileUpload({ useTempFiles: true}))



app.use(flash())

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

app.use(express.static(path.join(__dirname, 'public'), { redirect : false }))
app.all('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/users', require('./routes/registration'))
app.use('/users', require('./routes/image'))
app.use('/users', require('./routes/dashboard'))
app.use('/users', require('./routes/update'))


const PORT = process.env.PORT || 8080

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, console.log(`server started on ${PORT}`))
});
