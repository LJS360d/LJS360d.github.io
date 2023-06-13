import { highlightTakenTiles } from './ships.js';

export let highlightClaimedTiles = localStorage.getItem('highlightClaimedTiles') === 'true' ? true : false;
export let squareSize = localStorage.getItem('squareSize') || '3rem';
export let boardLabelFontSize = localStorage.getItem('boardLabelFontSize') || '1.5rem';
{ // Option: Highlight Claimed Tiles
    if (highlightClaimedTiles)
        document.getElementById('highlight-taken-squares').setAttribute('checked', highlightClaimedTiles)
    document.getElementById('highlight-taken-squares').addEventListener('change', function () {
        highlightClaimedTiles = !highlightClaimedTiles
        localStorage.setItem('highlightClaimedTiles', highlightClaimedTiles)
        if (highlightClaimedTiles)
            highlightTakenTiles()
        else
            unhighlightTakenTiles()
    })

    function unhighlightTakenTiles() {
        document.querySelectorAll('square.taken').forEach(square => {
            square.classList.remove('taken')
        })
    }

}

{ // Option: Square and Board Label Font Size
    const sizeSlider = document.getElementById('square-size-slider')
    updateSizes(boardLabelFontSize, squareSize)
    sizeSlider.value = squareSize.replace('rem', '')

    sizeSlider.addEventListener('input', function () {
        const newFontSize = sizeSlider.value / 2 + "rem"
        const newSquareSize = sizeSlider.value + "rem"
        updateSizes(newFontSize, newSquareSize)
    })

    function updateSizes(newFontSize, newSquareSize) {
        //TODO: Recalculate ships [left,top] for ships with position: "fixed"
        localStorage.setItem('boardLabelFontSize', newFontSize)
        localStorage.setItem('squareSize', newSquareSize)
        document.documentElement.style.setProperty('--squareSize', newSquareSize)
        document.documentElement.style.setProperty('--boardLabelFontSize', newFontSize)
        boardLabelFontSize = newFontSize
        squareSize = newSquareSize
    }
}