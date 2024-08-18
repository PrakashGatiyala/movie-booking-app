const crypto = require('crypto')
const User = require('../models/user.model')
const { hash } = require('../utils/hash')

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

const createAdmin = async () => {
  try {
    let admin = await User.findOne({ role: 'admin' })
    if (!admin) {
      const salt = crypto.randomBytes(16).toString('hex')
      await User.create({
        firstname: 'Admin',
        lastname: 'User',
        email: 'admin@gmail.com',
        password: hash(ADMIN_PASSWORD, salt),
        salt,
        role: 'admin',
      })
      console.log('Admin user created')
    }
  } catch (error) {
    console.log('Error creating admin user', error)
  }
}

module.exports = { createAdmin }
