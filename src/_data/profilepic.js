const md5 = require('md5')
const axios = require('axios')
const email = 'ihojmanb@gmail.com'
const HASH = md5(email)
module.exports =  () => {
    return  `https://www.gravatar.com/avatar/${HASH}`
  };