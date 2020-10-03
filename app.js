const express = require('express')
const exphbs = require('express-handlebars')
const passport = require('passport')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')

const db = require('./config/database')

db.authenticate()
.then(() => console.log('connected to database'))
.catch(err => console.log('error occured: '+ err))


const app = express()
app.engine('handlebars', exphbs({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')

require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({ extended: true}))

app.use( session({ secret: 'secret-weapon', resave: true, saveUninitialized: true}));

app.use(flash())

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


const PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`server started on ${PORT}`))