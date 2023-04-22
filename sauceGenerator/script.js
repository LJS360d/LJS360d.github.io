const categorySelect = document.getElementById('category')
getWaifuPic('sfw','neko')
categorySelect.onchange = async function () {
    const type = String(this.options[this.selectedIndex].parentNode.label).toLowerCase()
    const category = this.value
    await getWaifuPic(type, category)
}
const sendButton = document.querySelector('.send')
const sendFunction = sendButton.onclick = async () => {
    const type = String(categorySelect.options[categorySelect.selectedIndex].parentNode.label).toLowerCase()
    const category = categorySelect.value
    await getWaifuPic(type, category)
}
async function getWaifuPic(type, category) {
    const response = (await fetch(`https://api.waifu.pics/${type}/${category}`)).json()
    response.then(res => {
        const render = document.createElement('img')
        render.className = 'pic'
        render.src = res.url
        sendPostToWebhook(res.url)
        const contentDiv = document.querySelector('.content')
        while (contentDiv.firstChild)
            contentDiv.removeChild(contentDiv.lastChild)
        contentDiv.appendChild(render)
    })
}
function sendPostToWebhook(message) {
    const webHookURL = "https:"+"//discord.com/api/webhooks/1099209708100927498/OKaivbP5wGZnrqCcmHLJLXzo1E2ZQrav-W_O21gp_b9fvEfwyxmlpTpv9P6reEzX9rEu"
    let xhr = new XMLHttpRequest();
    xhr.open("POST", webHookURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        'content': message,
        'username': 'SauceGenerator',
    }));
}