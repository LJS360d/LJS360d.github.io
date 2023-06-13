import {
  boardCoords,
  columns,
  rows,
} from './board.js';
import { highlightClaimedTiles } from './options.js';
import {
  disableReadyButton,
  enableReadyButton,
  ready,
  readyButtonEnabled,
  setNotReady,
} from './server-side/onReady.js';

const ships = [
    { squares: 4, rotation: "right" },
    { squares: 3, rotation: "right" },
    { squares: 3, rotation: "right" },
    { squares: 3, rotation: "right" },
    { squares: 2, rotation: "right" },
    { squares: 2, rotation: "right" },
    { squares: 2, rotation: "right" },
    { squares: 1, rotation: "right" },
    { squares: 1, rotation: "right" },
]
const shipOnClick = function () {
    const positioning = this.getAttribute('positioning')
    if ((positioning ?? 0) == 0) {
        if (ready) setNotReady()
        if (readyButtonEnabled) disableReadyButton()
        if (highlightClaimedTiles) unhighlightTiles(this.getAttribute('takenTiles') ?? "")
        this.setAttribute('positioning', 1)
        this.removeAttribute('takenTiles')
        this.style.position = "absolute"
        window.onmousemove = mouseMoveHandler;
        window.onkeyup = rotateHandler;

    } else {
        const takenTiles = getTakenTiles(boardCoords.id, this.getAttribute('squares'), this.getAttribute('rotation'))
        const occupiedTiles = getOccupiedTiles(boardCoords.id, this.getAttribute('squares'), this.getAttribute('rotation'))
        if (checkTilesAvailable(occupiedTiles) && checkTilesValid(occupiedTiles)) {
            this.setAttribute('positioning', 0)
            this.style.position = "fixed"
            window.onmousemove = null;
            window.onkeyup = null;
            this.setAttribute('takenTiles', takenTiles)
            this.setAttribute('occupiedTiles', occupiedTiles)
            if (highlightClaimedTiles) highlightTakenTiles()
            if (checkAllShipsPlaced()) enableReadyButton()
        } else
            alert("Cannot place ship here")
    }
    function mouseMoveHandler() {
        document.querySelector('ship[positioning="1"]').style.left = boardCoords.x + "px"
        document.querySelector('ship[positioning="1"]').style.top = boardCoords.y + "px"
    }
    function rotateHandler(e) {
        if (e.code == 'KeyR') {
            const currentRotation = document.querySelector('ship[positioning="1"]').getAttribute('rotation')
            const newRotation = currentRotation == 'right' ? 'down' : 'right'
            document.querySelector('ship[positioning="1"]').setAttribute('rotation', newRotation)
        }
    }
}

/**
 * 
 * @param {Array<{squares: number, rotation: string}>} shipsJSON
 */
function buildShips(shipsJSON) {
    const shipContainer = document.getElementById("ship-container")
    for (const ship of shipsJSON) {
        const shipElement = document.createElement("ship")
        shipElement.setAttribute('rotation', ship.rotation)
        shipElement.setAttribute('squares', ship.squares)
        for (let i = 0; i < ship.squares; i++) {
            const squareElement = document.createElement('square')
            squareElement.setAttribute('type', 'ship')
            shipElement.appendChild(squareElement)

            shipElement.onclick = shipOnClick
        }
        shipContainer.appendChild(shipElement)
    }
}
buildShips(ships)
function checkAllShipsPlaced() {
    const ships = document.getElementsByTagName('ship')
    for (const ship of ships) {
        if (!ship.getAttribute('occupiedTiles')) {
            return false;
        }
    }
    return true;
}

function getOccupiedTiles(root, size, rotation) {
    const occupiedTiles = [];
    const [column, row] = [root.split('')[0], root.split('')[1]];
    switch (rotation) {
        case "right":
            occupiedTiles.push(`${column}${row}`)
            for (let i = 0; i < size; i++) {
                occupiedTiles.push(`${columns[columns.indexOf(column) + i]}${row}`)
            }
            break;
        case "down":
            occupiedTiles.push(`${column}${row}`)
            for (let i = 0; i < size; i++) {
                occupiedTiles.push(`${column}${rows[rows.indexOf(row) + i]}`)
            }
            break;
    }
    return occupiedTiles;

}
function getTakenTiles(root, size, rotation) {
    const takenTiles = [];
    const [column, row] = [root.split('')[0], root.split('')[1]];
    switch (rotation) {
        case "right":
            const [prevColumnRight, nextColumnRight] = [columns[columns.indexOf(column) - 1], columns[columns.indexOf(column) + Number(size)]]
            const [prevRowRight, nextRowRight] = [rows[rows.indexOf(row) - 1], rows[rows.indexOf(row) + 1]]
            takenTiles.push(`${prevColumnRight}${row}`)
            for (let i = 0; i < size; i++) {
                takenTiles.push(`${columns[columns.indexOf(column) + i]}${prevRowRight}`)
                takenTiles.push(`${columns[columns.indexOf(column) + i]}${row}`)
                takenTiles.push(`${columns[columns.indexOf(column) + i]}${nextRowRight}`)
            }
            takenTiles.push(`${nextColumnRight}${row}`)
            break;

        case "down":
            const [prevRowDown, nextRowDown] = [rows[rows.indexOf(row) - 1], rows[rows.indexOf(row) + Number(size)]]
            const [prevColumnDown, nextColumnDown] = [columns[columns.indexOf(column) - 1], columns[columns.indexOf(column) + 1]]
            takenTiles.push(`${column}${prevRowDown}`)
            for (let i = 0; i < size; i++) {
                takenTiles.push(`${prevColumnDown}${rows[rows.indexOf(row) + i]}`)
                takenTiles.push(`${column}${rows[rows.indexOf(row) + i]}`)
                takenTiles.push(`${nextColumnDown}${rows[rows.indexOf(row) + i]}`)
            }
            takenTiles.push(`${column}${nextRowDown}`)
            break;
        default:
            throw new Error("Unexpected rotation");
    }
    return takenTiles;
}
function checkTilesAvailable(tilesToClaim) {
    const claimedTiles = new Set();
    const ships = document.querySelectorAll('ship[takenTiles]');
    ships.forEach(ship => {
        const takenTiles = ship.getAttribute('takenTiles').split(',');
        takenTiles.forEach(tile => {
            claimedTiles.add(tile);
        });
    });
    for (let i = 0; i < tilesToClaim.length; i++) {
        if (claimedTiles.has(tilesToClaim[i])) {
            return false;
        }
    }
    return true;
}
function checkTilesValid(tilesToValidate) {
    for (let i = 0; i < tilesToValidate.length; i++) {
        if (tilesToValidate[i].length > 2) {
            return false;
        }
    }
    return true;
}
export function highlightTakenTiles() {
    const ships = document.querySelectorAll('ship[takenTiles]');
    ships.forEach(ship => {
        const tiles = ship.getAttribute('takenTiles').split(',')
        tiles.forEach(tile => {
            try {
                const square = document.getElementById(tile)
                square.classList.add('taken')
            } catch (error) {

            }
        })
    })
}
function unhighlightTiles(tiles) {
    if (tiles != "") {
        const tilesIDs = tiles.split(',')
        tilesIDs.forEach(tile => {
            try {
                const square = document.getElementById(tile)
                square.classList.remove('taken')
            } catch (error) {

            }
        })
    }
}

export function removeShipsOnClick() {
    const ships = document.querySelectorAll('ship[takenTiles]');
    ships.forEach(ship => {
        ship.onclick = null;
    })
}
export function restoreShipsOnClick() {
    const ships = document.querySelectorAll('ship[takenTiles]');
    ships.forEach(ship => {
        if (!ship.onclick) ship.onclick = shipOnClick
    })
}