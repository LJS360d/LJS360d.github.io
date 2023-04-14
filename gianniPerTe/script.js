document.getElementById('msgforgpt').addEventListener('keypress', async function (e) {
    if (e.key == "Enter" && !e.shiftKey) {
        const msgRender = document.createElement('md-block')
        msgRender.textContent = this.value
        msgRender.className = 'gptmsg'
        document.querySelector('div.content-right').appendChild(msgRender)
        await getGPTResponse(this.value).then(this.value = '')
    }
})
document.getElementById('msgsend').onclick = async function(){
    const msgInputBox = document.getElementById('msgforgpt')
    const msgRender = document.createElement('md-block')
    msgRender.textContent = msgInputBox.value
    msgRender.className = 'gptmsg'
    document.querySelector('div.content-right').appendChild(msgRender)
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
            const responseRender = document.createElement('md-block')
            responseRender.textContent = responsemsg
            responseRender.className = 'gptmsg'
            document.querySelector('div.content-left').appendChild(responseRender)
            toggleLoading()
        }
        )
        .catch(err => console.error(err));
}
function toggleLoading(){
    const dotContainer = document.querySelector('.dot-container')
    if(dotContainer.classList.contains('paused')){
        dotContainer.classList.remove('paused')
    }else{
        dotContainer.classList.add('paused')

    }
}