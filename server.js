const express = require('express');
var exphbs  = require('express-handlebars');
const socket = require('socket.io');

const app = express();
app.engine('handlebars',exphbs({
    layoutsDir: __dirname + '/views/layouts'
}))
app.set('view engine', 'handlebars');
app.use(express.static('public'))


const port = process.env.PORT || 3000;
const server = app.listen(port)

app.use(express.static('public'))

app.get('/', (req,res) => {
    res.render('main', {layout : 'index'})
})

const io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('chat', data => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing' , data => {
        socket.broadcast.emit('typing', data)
    })
})