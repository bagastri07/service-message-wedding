const express = require('express')
const mongoose = require('mongoose')
const response = require('./_helper/response')
require('dotenv').config()

const app = express()

const port = 2000

//database
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) throw err
    console.log('Database Connected:))')
})

//BOdy Parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.json({'data': 'Welcome to my beloved API'})
})

//Router
app.use('/message', require('./Routers/messageRouter'))

app.use((req, res, next) => {
    const err = new Error("");
    err.status = 404;
    next(err);
  });

app.use((err, req, res, next) => {
    if (err.status === 404) {
        response(res, 404, false, 'Page not Found', err)
    } else {
        response(res, 500, false, 'Internal server error')
    }
  });

app.listen(port, () => {
    console.log('Listerning on port:' + port)
})