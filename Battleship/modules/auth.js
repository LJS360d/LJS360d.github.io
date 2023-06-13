import { socket } from './server-side/connection.js';

export let username = localStorage.getItem('username') || null;
if(username) changeButtonToUserbar()

document.getElementById('auth-form').onsubmit = function() {
    username = document.getElementById('auth-username').value
    localStorage.setItem('username', username)
    socket.send('change-username', localStorage.getItem('username'))
    document.getElementById('auth-form').reset()
    document.getElementById('auth-modal').close()
    if(document.getElementById('auth-button'))
    changeButtonToUserbar()
    else 
    updateUserbar()
};

function changeButtonToUserbar(){
    const navbarLeft = document.querySelector('.navbar-left')
    const badge = document.createElement('i')
    badge.classList.add('fa', localStorage.getItem('badge') || 'fa-user', 'current-badge')
    const usernameSpan = document.createElement('span')
    usernameSpan.classList.add('username')
    usernameSpan.textContent = username
    const userbar = document.createElement('div')
    userbar.appendChild(badge)
    userbar.appendChild(usernameSpan)
    userbar.id = 'userbar'

    badge.onclick = changeBadge
    usernameSpan.onclick = document.getElementById('auth-button').onclick 

    navbarLeft.replaceChild(userbar, document.getElementById('auth-button'))
}
function updateUserbar(){
    const userbar = document.getElementById('userbar')
    const usernameSpan = userbar.querySelector('.username')
    usernameSpan.textContent = username
}
function changeBadge(){
    document.getElementById('badge-change').showModal()
}