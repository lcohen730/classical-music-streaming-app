require('dotenv').config()
require('./config/database')

const app = require('./app-server')

const PORT = 5000

app.listen(PORT, () => {
	console.log(`${PORT} points to Ravenclaw.`)
})