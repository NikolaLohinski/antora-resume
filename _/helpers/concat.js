'use strict'

module.exports = (...args) => {
    return args.slice(0, -1).join('')
}