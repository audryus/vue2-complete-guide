const mongoose = require('mongoose')
const {mongo} = require('../.env')

mongoose.connect(mongo.url, mongo.params)
    .catch(e => {
        const msg = 'Nao foi possivel conectar ao MongoDB'
        console.error(msg, e)
    })