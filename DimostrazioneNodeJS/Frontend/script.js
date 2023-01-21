const socket = io('ws://127.0.0.1:8080'); //socket connessa a <Localhost:8080>

socket.on('newmsg',(sender,content)=>{
    const chat = document.getElementById('chat')
    const msg = document.createElement('div')
    msg.innerText = `${sender}:${content}`
    msg.className = 'chatmsg'
    chat.append(msg)
})
//Funzionalità Frontend vvvvvvvvvv
document.getElementById('sndbtn').onclick = ()=>{
    const msg = document.getElementById('msg').value
    socket.send('newmsg',msg)
    document.getElementById('msg').value = ''
}
document.addEventListener('keypress',(e)=>{
    if (e.key === "Enter") {
        document.getElementById('sndbtn').onclick()
    }
})