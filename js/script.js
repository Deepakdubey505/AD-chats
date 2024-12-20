
const socket = io ('http://localhost:7000');
require('dotenv').config();
const form = document.getElementById('send-con');
const messageinput = document.getElementById('messageinp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('ting.mp3');

const append = (message , position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageinput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageinput.value =''
})

const PORT =process.env.PORT || 7000;
Expose 3306

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name)

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', data =>{
    append(`${name} leave the chat`, 'left')
})
