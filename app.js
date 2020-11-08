const express = require("express")
const mongoose = require("mongoose")
const app = express() 
const { Note, List, User } = require('../../Study/server-test/shemes')

const config = {
  uri: 'mongodb+srv://michaelAdmin:misha2424@mongotest.yd4kl.mongodb.net/app?retryWrites=true&w=majority',
  port: 4000
}

const start = async () => {
  try {
    await mongoose.connect(config.uri, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(config.port, () => console.log(`Server started on port ${config.port}`) ); 
  } catch (e) {
    console.error(`Server error ${e}`)
    process.exit(1)
  }
}

app.get('/', (req, res) => {
  res.send('Hello Home!')
})

app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if(err) return console.log(err);
    res.send(users)
  });
})

start()