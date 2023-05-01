export function appendTypewriterText(element, text) {
    const typewriterTxt = document.createElement('p')
    typewriterTxt.textContent = text
    typewriterTxt.addEventListener('animationend', () => {
        typewriterTxt.classList.remove('typewriter')
        typewriterTxt.classList.add('typewriter-done')
    })
    typewriterTxt.style.width = '0' // set initial width to 0
    typewriterTxt.classList.add('typewriter')
    typewriterTxt.style.width = ''
    if (element instanceof HTMLElement) {
        while(element.firstChild)
            element.removeChild(element.lastChild)
        element.appendChild(typewriterTxt)
    } else {
        throw new Error('Not an HTMLElement')
    }
}
