const AuthService = require('../services/auth.service')
const AppError = require('../errors/app.error')
const {
  createUserValidator,
  signInValidator,
} = require('../lib/validators/user.validator')

const handleUserSignup = async (req, res) => {
  const validationResult = await createUserValidator.safeParseAsync(req.body)
  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error })
  }
  const { firstname, lastname, email, password } = validationResult.data

  try {
    const token = await AuthService.signupWithEmailAndPassword({
      firstname,
      lastname,
      email,
      password,
    })

    return res.status(201).json({ status: 'success', data: { token } })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.code).json({ error: error.message })
    }
    console.log(`Error`, error)
    return res
      .status(500)
      .json({ status: 'error', error: 'Internal server error' })
  }
}

const handleUserSignin = async (req, res) => {
  const validationResult = await signInValidator.safeParseAsync(req.body)
  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error })
  }
  const { email, password } = validationResult.data

  try {
    const token = await AuthService.signinWithEmailAndPassword({
      email,
      password,
    })

    return res.status(200).json({ status: 'success', data: { token } })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.code).json({ error: error.message })
    }
    console.log(`Error`, error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const handleMe = (req, res) => {
  if (!req.user) {
    return res.json({ isLoggedIn: false })
  }
  return res.json({ isLoggedIn: true, data: { user: req.user } })
}

const handleUserLogout = (req, res) => {
  res.send('Logout')
}

module.exports = {
  handleUserSignup,
  handleUserSignin,
  handleMe,
  handleUserLogout,
}
