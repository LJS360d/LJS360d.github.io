import { socket } from './connection.js';

const randomOpponentButton = document.getElementById('random-opponent-button');
randomOpponentButton.onclick = function () {
    if (socket.connected) {
        socket.send('random-match-request')
        savedTextContent = setLoading(randomOpponentButton)
    } else
    setDisabled(randomOpponentButton)
}
socket.on('match-found', function (matchID,player1,player2) {
    randomOpponentButton.style.display = "none"
    sessionStorage.setItem('match',matchID)

})

export function disableOpponentSearch() {
    setDisabled(randomOpponentButton)
}
export function enableOpponentSearch() {
    restoreElement(randomOpponentButton, savedTextContent)
}

let savedTextContent = "Search a Random Opponent";
function setLoading(element) {
    if (element instanceof HTMLElement) {
        element.classList.add('disabled')
        const savedTextContent = element.textContent
        element.textContent = ""

        const dotsWrapper = document.createElement('div')
        dotsWrapper.classList.add('dots-wrapper')
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span')
            dot.classList.add('dot')
            dotsWrapper.appendChild(dot)
        }
        element.appendChild(dotsWrapper)
        return savedTextContent
    }
}
function setDisabled(element, display = "block") {
    if (element instanceof HTMLElement) {
        element.style.display = display
        element.classList.add('disabled')
        element.textContent = "Reconnect to use"
    }
    if (element instanceof HTMLButtonElement) {
        element.disabled = true
        element.className = "btn btn-secondary disabled"
    }
}
function restoreElement(element, savedTextContent, display = "block") {
    if (element instanceof HTMLElement) {
        element.style.display = display
        element.classList.remove('disabled')
        element.textContent = savedTextContent
    }
    if (element instanceof HTMLButtonElement) {
        element.disabled = false
        element.className = "btn btn-outline-success"
    }
}