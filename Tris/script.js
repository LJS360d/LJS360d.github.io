const socket = io('ws://2.47.38.54:8080',{secure:true})
const info = document.getElementById('info');
const softcache = window.sessionStorage;
//Naming
let username = softcache.getItem('username');
if(username != null){
    document.getElementById('namechange').style.display = 'none'
    document.getElementById("urname").textContent = username
    document.getElementById("urname").style.display = 'inline-block'
    socket.send('username',username)
}document.getElementById("namesnd").onclick =()=>{
    username = document.getElementById("nameinput").value;
    if(['',' '].includes(username)){
        window.alert('Name Invalid,Reserved or Already in Use')
    }else{
        softcache.setItem('username',username)
        document.getElementById("urname").replaceChildren(username);
        namingToggle(false) 
        socket.send('username', username)
    }
};document.getElementById('urname').ondblclick=()=>{
    username = null;
    namingToggle(true)
}
//Game
let symbol = 'X',turn=true;
const set = document.getElementsByClassName('cell');
for (const cell of set) {
    cell.onclick =()=>{
        if(turn){
            if(cell.style.color != 'white'){
                socket.send('played',Number(cell.id.substring(1))-1,symbol)
            }else{info.textContent = "Choose an empty space"}
        }else{info.textContent = "It's not your turn"}
    }
}
//Responses
socket.on('boardupdate',(position,symbol)=>{
    document.getElementById(`b${position}`).textContent = symbol
    document.getElementById(`b${position}`).style.color = 'white'
})
socket.on('symbol',sym=>{symbol=sym;if(sym=='O')turn=false})
socket.on('turnupdate',function(){turn=!turn})
socket.on('winner',(sym)=>{
    if(sym === symbol)
    info.textContent = `You won`
    else
    info.textContent = `You lost`
    setTimeout(resetBoard,3500)
})
socket.on('tie',()=>{
    info.textContent = 'it was a tie'
    setTimeout(resetBoard,3500)
    
})
//Functions
function namingToggle(change){
    if(change){
        document.getElementById('namechange').style.display = 'inline-block'
        document.getElementById("urname").style.display = 'none'; 
        document.getElementById("lb").style.display = 'table-cell';
        document.getElementById("nameinput").style.display = 'table-cell';
        document.getElementById("namesnd").style.display = 'table-cell';
    }else{
        document.getElementById("lb").style.display = 'none';
        document.getElementById("nameinput").style.display = 'none';
        document.getElementById("namesnd").style.display = 'none';
        document.getElementById("urname").textContent = username;
        document.getElementById("urname").style.display = 'inline-block'; 
    }
}
function resetBoard(){
    for (const cell of document.getElementsByClassName('cell')) {
        cell.style.color = '#202020'
    }
    socket.send('resetboard')
    info.textContent=''
}