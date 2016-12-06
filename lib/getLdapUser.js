'use strict'

const ldap = require('ldapjs')

module.exports = (options, callback) => {
  return new Promise((resolve, reject) => {
    const client = ldap.createClient({
      url: options.url,
      bindDN: options.bindDn,
      bindCredentials: options.bindCredentials,
      tlsOptions: options.tlsOptions || false
    })

    const filter = options.searchFilter.replace('{{username}}', options.user)

    let rows = []

    const searchOpts = {
      base: options.searchBase,
      scope: options.scope || 'sub',
      filter: filter
    }
    client.search(options.searchBase, searchOpts, (err, res) => {
      if (err) {
        if (callback) {
          return callback(err)
        }
        reject(err)
      }
      res.on('searchEntry', (entry) => {
        rows.push(entry.object)
      })
      res.on('error', (err) => {
        if (callback) {
          return callback(err)
        }
        reject(err)
      })
      res.on('end', (result) => {
        if (rows.length === 0) {
          if (callback) {
            return callback(`No results found for ${options.user}`)
          }
          reject(`No results found for ${options.user}`)
        }
        const data = rows.length === 1 ? rows[0] : rows

        if (callback) {
          return callback(null, data)
        }
        resolve(data)
      })
    })
  })
}
