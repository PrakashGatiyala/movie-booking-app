// It supports createUser and login routes, authenticate middleware and user controller.
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const { hash } = require('../utils/hash')
const AppError = require('../errors/app.error')

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET || JWT_SECRET === '') {
  throw new Error('JWT_SECRET is required')
}

class AuthService {
  /**
   * @function generateToken
   * @param {{ id: string, role: 'admin' | 'user' }} payload
   * @returns {string} jwt signed token
   */
  static generateToken(payload) {
    const token = jwt.sign(payload, JWT_SECRET)
    return token
  }

  /**
   * @function verifyToken
   * @param {string} token
   *  @returns {{ id: string; role: 'admin', iat: number | 'user' } | boolean} payload
   */
  static verifyToken(token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET)
      return payload
    } catch (error) {
      // console.log('Error verifying the token', error)
      return false
    }
  }
  /**
   * @function signupWithEmailAndPassword
   * @param {{firstname: string, lastname?: string, email: string, password: string}} data
   * @returns { Promise<string> } jwt signed token
   */
  static async signupWithEmailAndPassword(data) {
    const { firstname, lastname, email, password } = data
    const salt = crypto.randomBytes(16).toString('hex')
    const hashedPassword = hash(password, salt)

    try {
      let user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        salt,
      })
      const token = AuthService.generateToken({ id: user._id, role: user.role })
      return token
    } catch (error) {
      console.log(`Error creating the user`, error)
      if (error.code === 11000) {
        throw new AppError('Email already exists', 400)
      }
      throw new AppError('Internal server error', 500)
    }
  }
  /**
   * @function signinWithEmailAndPassword
   * @param {{email: string, password: string}} data
   * @returns {Promise<string>} jwt signed token
   */
  static async signinWithEmailAndPassword(data) {
    const { email, password } = data
    try {
      const user = await User.findOne({ email })
      if (!user) {
        throw new AppError(`User with email ${email} does not exists!`, 400)
      }
      const hashedPassword = hash(password, user.salt)
      if (hashedPassword !== user.password) {
        console.log('Invalid email or password')
        throw new AppError('Invalid email or password', 400)
      }

      const token = AuthService.generateToken({ id: user._id, role: user.role })
      return token
    } catch (error) {
      if (error instanceof AppError) {
        throw error // Rethrow the original CustomError
      }
      throw new AppError('Internal server error', 500)
    }
  }
}

module.exports = AuthService
