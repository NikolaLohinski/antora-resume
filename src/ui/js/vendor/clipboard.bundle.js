;(function () {
  'use strict'
  var ClipboardJS = require('clipboard')
  var clipboard = new ClipboardJS('.copy', {
    text: function (listingBlock) {
      listingBlock.classList.add('copied')
      setTimeout(function () {
        listingBlock.classList.remove('copied')
      }, 2000)
      var codeBlock = listingBlock.querySelector('code')
      if (codeBlock.classList.contains('language-bash')) {
        return codeBlock
          .innerText
          .split('\n')
          .map(function (line) {
            return line.trim()
          })
          .filter(function (line) {
            return !line.startsWith('#') && line !== ''
          })
          .join('\n')
          .replace(/(\$ |Λ\\: \$ |Λ\\:\$ )/g, '')
      }
      return codeBlock.innerText
    },
  })
  clipboard.on('success', function (e) {
    e.clearSelection()
  })
})()
