const express = require('express')

const adminRoutes = require('../routes/admin.routes')
const authRoutes = require('../routes/auth.routes')
const userRoutes = require('../routes/user.routes')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ status: 'Success', message: 'Server is up and running' })
})

app.use('/admin', adminRoutes)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)

module.exports = app
