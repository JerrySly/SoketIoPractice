
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


app.use(cors())

app.get('/', (req,res)=>{
    res.send('<h1>Hello world</h1>')
})

io.on('connection', (socket) => {
    console.log('User connected')
})


server.listen(3000, () => {
    console.log('Listen on 3000')
})