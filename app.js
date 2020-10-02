const express = require('express')
const exphbs = require('express-handlebars')
// const db = require('./config/database')
const path = require('path')
const PORT = process.env.PORT || 8080
const app = express()


app.engine('handlebars', exphbs({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.render('index', { layout: 'landing'}))

app.listen(PORT, console.log(`server started on ${PORT}`))