'use strict'

const config = require('./config')
const getLdapUser = require('./lib/getLdapUser')

let options = config.ldap
options.user = 'engj'

getLdapUser(options).then((data) => {
  console.log(data)
  process.exit(0)
}).catch((err) => {
  console.error(err)
  process.exit(0)
})

