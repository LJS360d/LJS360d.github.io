import { showSnackbarGreenText } from './modules/snackbar.js'
const animalType = document.getElementById('type')
function renderAnimalImage(element, type) {
    fetch(`https://shibe.online/api/${type}?count=1&urls=true&httpsUrls=true`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const imgUrl = data[0]
            const img = document.createElement('img');
            img.src = imgUrl;

            if (element instanceof HTMLElement && !element.firstChild) {
                element.appendChild(img);
            } else {
                element.removeChild(element.firstChild);
                element.appendChild(img);
            }
        })
        .catch(error => {
            console.error(error)
            element.textContent = `Error fetching ${type} image`, error;
        });
}
renderAnimalImage(document.querySelector('.content'), animalType.value)

document.querySelector('.content').addEventListener('click', () => {
    renderAnimalImage(document.querySelector('.content'), animalType.value)
})
document.body.addEventListener('keydown', (e) => {
    if (e.key === ' ')
        renderAnimalImage(document.querySelector('.content'), animalType.value)
})
animalType.onchange = () => {
    renderAnimalImage(document.querySelector('.content'), animalType.value)
}

const copyUrlBtn = document.getElementById('copy')
copyUrlBtn.onclick = () => {
    const imgUrl = document.querySelector('.content img').src
    navigator.clipboard.writeText(imgUrl).then(() => showSnackbarGreenText('Copied URL!')
    )}
