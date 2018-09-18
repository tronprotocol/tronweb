const express = require('express')
const next = require('next')

const devProxy = {
    /*'/wallet': {
        target: 'http://52.44.75.99:8090',
        //target: 'http://172.16.20.232:8096',
        pathRewrite: {'^/wallet': '/wallet'},
        changeOrigin: true
    },*/
    /*'/event':{
        target: 'http://127.0.0.1:18889',
        pathRewrite: {'^/event': '/event'},
        changeOrigin: true
    }*/
}

const port = parseInt(process.env.PORT, 10) || 3000
const env = process.env.NODE_ENV
const dev = env !== 'production'
const app = next({
    dev
})

const handle = app.getRequestHandler()

let server;
app.prepare()
    .then(() => {
        server = express()

        // Set up the proxy.
        if (dev && devProxy) {
            const proxyMiddleware = require('http-proxy-middleware')
            Object.keys(devProxy).forEach(function (context) {
                server.use(proxyMiddleware(context, devProxy[context]))
            })
        }

        // Default catch-all handler to allow Next.js to handle all other routes
        server.all('*', (req, res) => handle(req, res))

        server.listen(port, err => {
            if (err) {
                throw err
            }
            console.log(`> Ready on port ${port} [${env}]`)
        })
    })
    .catch(err => {
        console.log('An error occurred, unable to start the server')
        console.log(err)
    })