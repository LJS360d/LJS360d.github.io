export const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
export const rows = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const boardCoords = { x: 0, y: 0, id: null }
export function buildBoard(rows, columns) {
    const board = document.createElement('board')
    const root = document.createElement('span')
    board.appendChild(root)
    for (const column of columns) {
        const columnLabel = document.createElement('span')
        columnLabel.textContent = column
        columnLabel.classList.add('column-label')
        columnLabel.setAttribute('column', column)
        board.appendChild(columnLabel)
    }
    for (const row of rows) {
        const rowLabel = document.createElement('span')
        rowLabel.textContent = row
        rowLabel.classList.add('row-label')
        rowLabel.setAttribute('row', row)
        board.appendChild(rowLabel)
        for (const column of columns) {
            const square = document.createElement('square')
            square.name = `{column:'${column}',row:'${row}'}`
            square.id = `${column}${row}`
            square.setAttribute('column', column)
            square.setAttribute('row', row)
            square.addEventListener('mouseover', function (e) {
                boardCoords.x = this.offsetLeft
                boardCoords.y = this.offsetTop
                boardCoords.id = e.target.id
            })

            board.appendChild(square)
        }
    }
    return board
}
const board = buildBoard(rows, columns)
document.getElementById('board-container').appendChild(board)

document.getElementById('board-container').appendChild(buildReadyButton())
function buildReadyButton() {
    const button = document.createElement('button')
    button.classList.add('ready')
    button.innerText = "Ready!"
    return button
}
export function resetBoards() {
    resetBoard()
    resetOpponentBoard()
}
export function resetBoard() {
    const board = document.getElementById('board-container').firstElementChild
    if (board) {
        board.querySelectorAll('square').forEach(square => {
            square.classList.remove('miss')
            square.classList.remove('hit')
        })
    }
}
export function resetOpponentBoard() {
    const opponentBoard = document.getElementById('opponent-board-container').firstChild
    if (opponentBoard) {
        opponentBoard.querySelectorAll('square').forEach(square => {
            square.classList.remove('miss')
            square.classList.remove('hit')
        })
    }
}