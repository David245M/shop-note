const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

const register = async (req, res) => {
  try {
    const {email, password, nick} = req.body
    console.log(req.body)
    const candidate = await User.findOne({ email })
    console.log(candidate)
    if (candidate) {
      return res.status(400).json({ message: "There is alredy created user on this email" })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, nick, password: hashedPassword })
    console.log(user)
    await user.save()
    res.status(201).json({ message: "User has been created" })

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Registration Server Error: " + err })
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

const users = async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: "Shema Error: "+ error })
  }
} 

router.post('/register', register)
router.post('/login', login)
router.get('/users', users)

module.exports = router