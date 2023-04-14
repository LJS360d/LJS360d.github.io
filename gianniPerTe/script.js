document.getElementById('msgforgpt').addEventListener('keypress', async function (e) {
    if (e.key == "Enter" && !e.shiftKey) {
        const contentRight = document.createElement('div')
        contentRight.className = 'content-right'
        const msgRender = document.createElement('md-block')
        msgRender.textContent = this.value
        msgRender.className = 'gptmsg'
        contentRight.appendChild(msgRender)
        document.querySelector('div.content').appendChild(contentRight)
        await getGPTResponse(this.value).then(this.value = '')
    }
})
document.getElementById('msgsend').onclick = async function () {
    const msgInputBox = document.getElementById('msgforgpt')
    const contentRight = document.createElement('div')
    contentRight.className = 'content-right'
    const msgRender = document.createElement('md-block')
    msgRender.textContent = msgInputBox.value
    msgRender.className = 'gptmsg'
    contentRight.appendChild(msgRender)
    document.querySelector('div.content').appendChild(contentRight)
    await getGPTResponse(msgInputBox.value).then(msgInputBox.value = '')
}

async function getGPTResponse(msg) {
    toggleLoading()
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '6cc43e5dd8mshaf4053f71a4289ap1c0e57jsn58536d97bc74',
            'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
        },
        body: `{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"${msg}"}]}`
    };

    fetch('https://openai80.p.rapidapi.com/chat/completions', options)
        .then(response => response.json())
        .then(httpresponse => {
            const responsemsg = httpresponse.choices[0].message.content
            const contentLeft = document.createElement('div')
            contentLeft.className = 'content-left'
            const responseRender = document.createElement('md-block')
            responseRender.textContent = responsemsg
            responseRender.className = 'gptmsg'
            contentLeft.appendChild(responseRender)
            document.querySelector('div.content').appendChild(contentLeft)
            toggleLoading()
        }
        )
        .catch(err => console.error(err));
}
function toggleLoading() {
    const dotContainer = document.querySelector('.dot-container')
    if (dotContainer.classList.contains('paused')) {
        dotContainer.classList.remove('paused')
    } else {
        dotContainer.classList.add('paused')

    }
}