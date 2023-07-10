const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema
const passwordpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{5,}$/;
const usernamePattern = /^[a-zA-Z]+\.[a-zA-Z]+$/;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

// static signup method
userSchema.statics.signup = async function(email,name, password) {

  // validation
  if (!email || !password || !name) {
    throw Error('All fields must be filled')
  }
  // if (!validator.isEmail(email)) {
  //   throw Error('Email not valid')
  // }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error('Password not strong enough')
  // }

  if(!passwordpattern.test(password))
  {
    throw Error('Password not strong enough')
  }

  if(!usernamePattern.test(email))
  {
    throw Error('User name not valid')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('User name already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email,name, password: hash })

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect user name')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)