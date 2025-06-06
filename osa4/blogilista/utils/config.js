require('dotenv').config()

let TOKENSECRET = process.env.SECRET
let PORT = process.env.PORT
let MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
  TOKENSECRET
}