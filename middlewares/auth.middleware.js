const AuthService = require('../services/auth.service')
const authenticationMiddleware = (req, res, next) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return next()
  }
  const token = header.split(' ')[1]
  const userPayload = AuthService.verifyToken(token)
  if (userPayload) {
    req.user = userPayload
  }
  next()
}

/**
 * @function restrictToRole
 * @param { 'admin' | 'user'} role
 */
const restrictToRole = (role) => {
  const accessLevelMapping = {
    admin: 0,
    user: 9,
  }
  return (req, res, next) => {
    // Check if the user is authenticated
    if (!req.user) {
      return res.status(403).json({
        error: 'You need to be authenticated to access this resource',
      })
    }
    const userRole = req.user.role
    const userAccessLevel = accessLevelMapping[userRole]
    const requiredAccessLevel = accessLevelMapping[role]
    if (userAccessLevel > requiredAccessLevel) {
      return res.status(403).json({
        error: 'Access Denied',
      })
    }
    next()
  }
}

module.exports = { authenticationMiddleware, restrictToRole }
