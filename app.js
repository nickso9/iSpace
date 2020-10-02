const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const PORT = process.env.PORT || 8080
const app = express()


app.engine('handlebars', exphbs({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


app.listen(PORT, console.log(`server started on ${PORT}`))