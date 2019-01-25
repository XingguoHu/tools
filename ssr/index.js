const express = require('express')
const server = express()
const fs = require('fs')
const path = require('path')

const {
  createBundleRenderer
} = require('vue-server-renderer')

const serverBundle = require(path.join(__dirname, '../dist-ssr/vue-ssr-server-bundle.json'));
const clientManifest = require(path.join(__dirname, '../dist/vue-ssr-client-manifest.json'))

const renderer = createBundleRenderer(serverBundle, {
  template: fs.readFileSync(path.join(__dirname, '../public/ssr-template.html'), 'utf-8'),
  runInNewContext: false,
  clientManifest
})

server.use(express.static(path.join(__dirname, '../dist')));

server.get('*', (req, res) => {

  const context = {
    url: req.url
  }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})



server.listen(8080)