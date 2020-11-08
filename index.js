const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()
const port = config.get('port')
const uri = config.get('uri')

app.use(express.json())
app.use('/api/auth', require('./routes/auth.routes'))

const start = async () => {
  try {
    await mongoose.connect(uri, 
      { 
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    app.listen(port, () => console.log(`Server has been started on ${port}...`))
  } catch (e) {
    console.error(`Server Error: ${e}`)
    process.exit(1)
  }
}

start()