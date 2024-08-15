const { createUser, signIn } = require('../services/user.service')
const { CustomError } = require('../errorhandler/custom.errorhandler')
const {
  createUserValidator,
  signInValidator,
} = require('../lib/validators/user.validator')

const handleUserSignup = async (req, res) => {
  const validationResult = createUserValidator.safeParse(req.body)
  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error })
  }
  const { firstname, lastname, email, password, role } = validationResult.data

  try {
    const user = await createUser({
      firstname,
      lastname,
      email,
      password,
      role,
    })

    res.status(201).json({ data: { id: user._id, token: user.token } })
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.code).json({ error: error.message })
    }
    res.status(500).json({ error: 'Internal server error' })
  }
}

const handleUserSignin = async (req, res) => {
  const validationResult = signInValidator.safeParse(req.body)
  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error })
  }
  const { email, password } = validationResult.data

  try {
    const user = await signIn({ email, password })

    res.status(200).json({
      message: `Signin Successful for ${user.firstname}`,
      token: user.token,
    })
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.code).json({ error: error.message })
    }
    res.status(500).json({ error: 'Internal server error' })
  }
}

const handleUserLogout = (req, res) => {
  res.send('Logout')
}

module.exports = { handleUserSignup, handleUserSignin, handleUserLogout }
