const express = require("express")
const path = require('path')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('*', () => console.log('App working'))

app.listen(PORT, () => console.log(`APP listen on ${PORT}`))