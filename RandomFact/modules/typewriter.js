export function appendTypewriterText(element, text) {
    const typewriterTxt = document.createElement('p')
    typewriterTxt.className = 'typewriter'
    typewriterTxt.textContent = text
    typewriterTxt.addEventListener('animationend', () => {
        typewriterTxt.classList.remove('typewriter')
        typewriterTxt.classList.add('typewriter-done')
    })
    if (element instanceof HTMLElement) {
        element.appendChild(typewriterTxt)
    } else {
        throw new Error('Not an HTMLElement')
    }
}