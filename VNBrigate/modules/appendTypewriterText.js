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
        element.appendChild(typewriterTxt)
    } else {
        throw new Error('Not an HTMLElement')
    }
}
