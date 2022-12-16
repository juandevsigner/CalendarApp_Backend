const express = require('express')
require('dotenv').config()

const app = express();

app.use(express.static('public'))

app.listen(process.env.PORT, ()=>{
    console.log('Server online at', process.env.PORT)
})