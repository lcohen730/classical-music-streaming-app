const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)

const db = mongoose.connection


db.on('connected', () => {
    console.log(`Fresh order of ${db.name} from ${db.host}:${db.port}`)
})

module.exports = mongoose