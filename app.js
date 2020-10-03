const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')


const db = require('./config/database')

db.authenticate()
.then(() => console.log('connected to database'))
.catch(err => console.log('error occured: '+ err))


const app = express()
app.engine('handlebars', exphbs({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true}))

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


const PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`server started on ${PORT}`))