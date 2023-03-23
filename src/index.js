const express = require('express')
const path = require('path')
const Socketio = require('socket.io')

const app = express()
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(require('express-ejs-layouts'))

app.use(require('morgan')('dev'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/hello', (req, res) => {
    return res.json({greeting: 'Hello API'})
})

const server = app.listen(app.get('port'), console.log(`Listing on port: ${app.get('port')}`))



const io = Socketio(server)

io.on('connection', (socket) => {
    console.log('New connection established', socket.id)
    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data)
    })
    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data)
    })
})


