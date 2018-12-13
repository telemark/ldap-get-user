[![Build Status](https://travis-ci.org/telemark/ldap-get-user.svg?branch=master)](https://travis-ci.org/telemark/ldap-get-user)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# ldap-get-user

Get user from LDAP returns object

## Set options

```JavaScript
const options = {
  user: 'riemann', // The user to get
  url: 'ldap://ldap.forumsys.com:389',
  bindDn: 'cn=read-only-admin,dc=example,dc=com',
  bindCredentials: 'password',
  searchBase: 'dc=example,dc=com',
  searchFilter: '(sAMAccountName={{username}})'
  /* If LDAPS use ldaps in URL and tlsOptions
  tlsOptions: {
    rejectUnauthorized: true,
    ca: [
      fs.readFileSync(path.join(__dirname, 'filename')
    ]
  }
  */
}
```
## Using promises

```JavaScript
getLdapUser(options).then((data) => {
  console.log(data)
  process.exit()
}).catch((err) => {
  console.error(err)
  process.exit()
})
```

## Using callbacks

```JavaScript
getLdapUser(options, (err, data) => {
  if (err) {
    console.log(err)
    process.exit(0)
  } else {
    console.log(data)
  }
})
```

## License

[MIT](LICENSE)