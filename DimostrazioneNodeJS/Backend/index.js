const http = require('http').createServer(); 
const io =  require('socket.io') (http, {cors: {origin: "*"}});
http.listen(8080, () => console.log(`listening on port ${http.address().port}`))

io.on('connection', (socket) =>{

    console.log(`User connected ID:${socket.id}`)

    socket.on('message',(message,content)=>{

        console.log(`${socket.id} sent ${message}`);
        
        if (message == 'newmsg') {
            console.log(content);
            io.emit('newmsg',socket.id,content)
        }
    })
})
