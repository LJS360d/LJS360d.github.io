import { sendChatMessage } from './chat.js';
import { socket } from './connection.js';

const readyButton = document.querySelector("button.ready")
export let ready = false;
export let readyButtonEnabled = (readyButton.style.display !== "none")
readyButton.onclick = function () {
    const ships = Array.from(document.getElementsByTagName("ship"));
    const occupiedTiles = new Set()
    ships.forEach(ship => {
        ship.getAttribute("occupiedtiles").split(",").forEach((tile) => occupiedTiles.add(tile))
    })
    const shipTiles = Array.from(occupiedTiles).toString()
    setReady(shipTiles)
}
export function setReady(shipTiles) {
    socket.send("set-ready", shipTiles)
    readyButton.disabled = true
    readyButton.classList.add("disabled")
    ready = true
    sendChatMessage("Ready!")
}
export function setNotReady() {
    socket.send("set-not-ready")
    ready = false
    sendChatMessage("not Ready")
}

export function enableReadyButton() {
    readyButton.disabled = false
    readyButton.classList.remove("disabled")
    readyButton.style.display = "block"
}
export function disableReadyButton() {
    readyButton.disabled = true
    readyButton.classList.add("disabled")
    readyButton.style.display = "none"
}