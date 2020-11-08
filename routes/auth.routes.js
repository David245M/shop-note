const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

const register = async (req, res) => {
  try {
    const {email, password} = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      return res.status(400).json({ message: "There is alredy created user on this email" })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword })
    await user.save()

    res.status(201).json({ message: "User has been created" })

  } catch (err) {
    res.status(500).json({ message: "Registration Server Error" })
  }
}

const login = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User is not founded" })
    }
    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
      return res.status(400).json({ message: "Wrong password" })
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )

    res.json({ token, userId: user.id})

  } catch (err) {
    res.status(500).json({ message: "Login Server Error" })
  }
}


router.post('/register', register)
router.post('/login', login)

module.exports = router