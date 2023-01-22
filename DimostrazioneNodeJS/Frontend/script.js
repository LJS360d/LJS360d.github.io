const socket = io('ws://127.0.0.1:8080'); //Socket connessa a <Localhost:8080>

socket.on('newmsg',(sender,content)=>{ //Ricezione di un messaggio !Funzione Bloccante! 
    const chat = document.getElementById('chat') 
    const msg = document.createElement('div')
    msg.innerText = `${sender}:${content}`
    msg.className = 'chatmsg'
    chat.append(msg)
})

//Funzionalità Frontend vvvvvvvvvv
const sessioncache = window.sessionStorage
const namesec = document.getElementById('nameenter')
let username = sessioncache.getItem('username') 
username!=null ? namesec.style.display = 'none' : namesec.style.display = 'block'

document.getElementById('sndbtn').onclick =()=>{
    const msg = document.getElementById('msg').value
    if(!['',' '].includes(msg)){
        socket.send('newmsg',username,msg)}
    document.getElementById('msg').value = ''
}
document.getElementById('submitname').onclick =()=>{
    sessioncache.setItem('username',document.getElementById('nameinpt').value)
    username = sessioncache.getItem('username')
    namesec.style.display = 'none'
}
document.addEventListener('keypress',(e)=>{
    if (e.key === "Enter" && username != null) {
        document.getElementById('sndbtn').onclick() 
    }
    if(e.key === 'Enter' && username === null){
        document.getElementById('submitname').onclick()
    }
})

