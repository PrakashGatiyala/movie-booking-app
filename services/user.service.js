// It supports createUser and login routes, authenticate middleware and user controller.
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const { generateToken } = require('../lib/auth.lib')
const { CustomError } = require('../errorhandler/custom.errorhandler')

const createUser = async ({ firstname, lastname, email, password, role }) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.createHmac('sha256', salt).update(password).digest('hex')

  try {
    let user = await User.create({
      firstname,
      lastname,
      email,
      password: hash,
      salt,
      role,
    })
    const token = generateToken({ id: user._id, role: user.role })
    user.token = token
    return user
  } catch (error) {
    if (error.code === 11000) {
      throw new CustomError('Email already exists', 400)
    }
    throw new CustomError('Internal server error', 500)
  }
}

const signIn = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      throw new CustomError('Invalid email or password', 401)
    }
    const hash = crypto
      .createHmac('sha256', user.salt)
      .update(password)
      .digest('hex')
    if (hash !== user.password) {
      console.log('Invalid email or password')
      throw new CustomError('Invalid email or password', 401)
    }
    const token = generateToken({ id: user._id, role: user.role })
    user.token = token
    return user
  } catch (error) {
    if (error instanceof CustomError) {
      throw error // Rethrow the original CustomError
    }
    throw new CustomError('Internal server error', 500)
  }
}

module.exports = { createUser, signIn }
