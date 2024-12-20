

const io = require('socket.io')(7000, {
    cors: { // Corrected from 'corse' to 'cors'
        origin: "*", // This allows all origins. For production, specify allowed origins.
    }
});

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        // console.log("new user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users [socket.id]);
        delete users[socket.id];
    });
});