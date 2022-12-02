require('dotenv').config();
const express = require("express");
const app = express();

const http = require("http");
const serve = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(serve);
const port = process.env.PORT || 3000 ;


app.get("/", (req,res)=>{ 
    res.sendFile(__dirname+"/index.html")
});

io.on('connection',(socket)=>{
    console.log("Usuario Conectado");


    socket.on("chat message", (msg)=>{
        console.log("El mensaje es: "+msg);

        io.emit("chat message",msg);
    });


    socket.on('disconnect', ()=>{
        console.log("Usuario desconetcado")
    });
});


serve.listen(port, ()=>{
    console.log("Listening: "+port);
});
