const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
  return token
}

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    return payload
  } catch (error) {
    return null
  }
}

module.exports = { generateToken, verifyToken }
