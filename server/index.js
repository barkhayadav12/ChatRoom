const express=require('express');
const app=express();
const cors=require('cors');
const http=require('http');
const server=http.createServer(app);
const {Server}=require('socket.io');
app.use(cors());
const io=new Server(server,{
    cors:{
        origin:'https://chat-room-ashen.vercel.app',
        methods:["GET","POST"],
    }
});




io.on('connection',(socket)=>{
    console.log(`${socket.id} is connected`);
    
    socket.on('join_room',(data)=>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    })

    socket.on('send_message',(data)=>{
        socket.to(data.room).emit('receive_message',data);
    })
    socket.on("disconnect",(socket)=>{
        console.log('user disconnected',socket.id);
    })
})


server.listen(3001,()=>{
    console.log('server is running')
})
