import {
  buildBoard,
  columns,
  resetBoards,
  rows,
} from '../board.js';
import {
  removeShipsOnClick,
  restoreShipsOnClick,
} from '../ships.js';
import { receiveChatMessage } from './chat.js';
import { socket } from './connection.js';
import { disableReadyButton } from './onReady.js';
import { enableOpponentSearch } from './opponent-search.js';

let isItMyTurn = false
socket.on('player-disconnected', (id) => {
    if (id !== sessionStorage.getItem('id')) {
        receiveChatMessage('System', 'Your opponent disconnected,you won the match')
        endMatch()
    }
})

socket.on('match-started', (player1, player2) => {
    receiveChatMessage('System', `Match started:(P1)${player1} vs. (P2)${player2}`)
    removeShipsOnClick()
    disableReadyButton()
    showOpponentBoard()


})

socket.on('match-ended', (winner) => {
    endMatch(winner)
})
socket.on('turn-update', (turn, player) => {
    document.getElementById('turn-counter').textContent = `Turn: ${turn}`
    isItMyTurn = (sessionStorage.getItem('id') === player)
    document.getElementById('turn-counter').classList.toggle('my-turn', isItMyTurn);
})
socket.on('hit', (squareID) => {
    document.getElementById('board-container').querySelector(`#${squareID}`).classList.add('hit')
})

socket.on('miss', (squareID) => {
    document.getElementById('board-container').querySelector(`#${squareID}`).classList.add('miss')
})
socket.on('hit-opponent', (squareID) => {
    document.getElementById('opponent-board-container').querySelector(`#${squareID}`).classList.add('hit')
})
socket.on('miss-opponent', (squareID) => {
    document.getElementById('opponent-board-container').querySelector(`#${squareID}`).classList.add('miss')
})

function endMatch(winner) {
    //TODO:ELO
    if (sessionStorage.getItem('id') === winner) {
        //TODO:Win sequence
    } else {
        //TODO: Lose sequence 
    }
    sessionStorage.removeItem('match')
    enableOpponentSearch()
    document.getElementById('opponent-board-container').innerHTML = ''
    restoreShipsOnClick()
    resetBoards()
}

function showOpponentBoard() {
    const board = buildBoard(rows, columns)
    const opponentBoardContainer = document.getElementById('opponent-board-container')
    opponentBoardContainer.appendChild(board)
    board.querySelectorAll('square').forEach(square => {
        square.onclick = opponentSquareOnClick
    })
}

function opponentSquareOnClick() {
    if (isItMyTurn) {
        socket.send('square-attacked', this.id)
        this.setAttribute('onclick', null)
    } else {
        alert('It is not your turn')
    }
}