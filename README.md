# ldap-get-user

## Using promises
```js
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

getLdapUser(options).then((data) => {
  console.log(data)
  process.exit()
}).catch((err) => {
  console.error(err)
  process.exit()
})
```

## Using callbacks
```js
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

getLdapUser(options, (err, data) => {
  if (err) {
    console.log(err)
    process.exit(0)
  } else {
    console.log(data)
  }
})
```
