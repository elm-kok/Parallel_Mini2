const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/allrooms', require('./routes/allroomsRoutes'))
app.use('/room', require('./routes/roomRoutes'))
app.use('/users', require('./routes/usersRoutes'))

const PORT = 5000
app.listen(PORT, () => console.log(`Server started at port ${PORT}.`))
