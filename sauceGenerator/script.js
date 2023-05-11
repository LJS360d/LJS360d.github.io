const categorySelect = document.getElementById('category')
const tagSelect = document.getElementById('tagSelect')
getWaifuPic('sfw','neko')
categorySelect.onchange = async function () {
    const type = String(this.options[this.selectedIndex].parentNode.label).toLowerCase()
    const category = this.value
    await getWaifuPic(type, category)
}
const sendButtonv1 = document.getElementById('v1')
const sendFunction = sendButtonv1.onclick = async () => {
    const type = String(categorySelect.options[categorySelect.selectedIndex].parentNode.label).toLowerCase()
    const category = categorySelect.value
    await getWaifuPic(type, category)
}
const sendButtonv2 = document.getElementById('v2')
const sendFunctionv2 = sendButtonv2.onclick = async () => {
    await getWaifuPicV2(tagSelect.value)
}
tagSelect.addEventListener('change',function (){ 
    getWaifuPicV2(this.value)
})
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
async function getWaifuPicV2(tag){
    const response = (await fetch(`https://api.waifu.im/search/?included_tags=${tag}`)).json()
    response.then(res => {
        const imageURL = res.images[0].url
        const render = document.createElement('img')
        render.className = 'pic'
        render.src = imageURL
        sendPostToWebhook(imageURL)
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