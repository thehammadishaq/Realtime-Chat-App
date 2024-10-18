const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const cors = require('cors');

app.use(cors());

const { Server } = require('socket.io');

// Read SSL certificate and key
const privateKey = fs.readFileSync('ssl/key.pem', 'utf8');
const certificate = fs.readFileSync('ssl/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

const io = new Server(httpsServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

let onlineUsers = [];

io.on("connection", (socket) => {
    socket.emit("user-connected");
    socket.on("user-online", (user) => {
        if (!onlineUsers.includes(user) && user !== null && user !== undefined)
            onlineUsers.push(user);
        socket.emit("users-online", onlineUsers);
    });
    socket.on("user-loggedout", (username) => {
        onlineUsers = onlineUsers.filter((usr) => usr !== username);
        socket.broadcast.emit("user-disconnected", onlineUsers);
    });
    socket.on('send-message', (message) => {
        socket.broadcast.emit("receive-message", message);
    });
});

const PORT = 8080;
httpsServer.listen(PORT, () => {
    console.log(`HTTPS server listening on port ${PORT}`);
});
