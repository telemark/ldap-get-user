'use strict'

const ldap = require('ldapjs')
const Promise = require('bluebird')

module.exports = (options, callback) => {
  return new Promise((resolve, reject) => {
    const client = ldap.createClient({
      url: options.url,
      bindDN: options.bindDn,
      bindCredentials: options.bindCredentials,
      tlsOptions: options.tlsOptions || false
    })

    const filter = options.searchFilter.replace('{{username}}', options.user)
    console.log(`Searching user: ${options.user}`)
    var rows = []

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
        if (callback) {
          return callback(null, result)
        }
        resolve(rows)
      })
    })
  })
}
