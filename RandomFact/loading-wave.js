export function toggleLoading() {
    const msgInpt = document.getElementById('msgforgpt')
    const dotContainer = document.querySelector('.dot-container')
    if (dotContainer.classList.contains('paused')) {
        dotContainer.classList.remove('paused')
    } else {
        dotContainer.classList.add('paused')
    }
}