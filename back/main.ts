
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app)

const {Server} = require('socket.io')
const io = new Server(server,{
    cors:{
        origin: '*'
    }
});

const cors = require('cors')
let currentTyping:Array<{nickConfig:{nick:string,color:string},id: string}> = []

app.use(cors())

app.get('/', (req,res)=>{
    res.send('<h1>Hello world</h1>')
})

io.on('connection', (socket) => {
    console.log('User connected')
    socket.on('send', (msgObject)=>{
        console.log('msg: ',msgObject)
        socket.broadcast.emit('new-message', msgObject)
    })
    socket.on('connection-message', (nickConfig) => {
        socket.broadcast.emit('new-connection', nickConfig)

    })
    socket.on('typing-text', (nickConfig) => {
        console.log({
            nickConfig,
            id:socket.id
        })
        if(currentTyping.filter(x=>x.id == socket.id).length == 0)
        currentTyping.push({
            nickConfig,
            id:socket.id
        })
        socket.broadcast.emit('somebody-typing',currentTyping)
    })

    socket.on('end-typing', () => {
        currentTyping = currentTyping.filter(x=>x.id != socket.id);
        socket.broadcast.emit('somebody-typing',currentTyping)
    })

})


server.listen(3000, () => {
    console.log('Listen on 3000')
})