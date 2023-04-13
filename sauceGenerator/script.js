const categorySelect = document.getElementById('category')
categorySelect.onchange = async function(){
    const type = String(this.options[this.selectedIndex].parentNode.label).toLowerCase()
    const category = this.value
    await getWaifuPic(type,category)
}
const sendButton = document.querySelector('.send')
sendButton.onclick = async()=>{
    const type = String(categorySelect.options[categorySelect.selectedIndex].parentNode.label).toLowerCase()
    const category = categorySelect.value
    await getWaifuPic(type,category)
}

async function getWaifuPic(type,category){
    const response = (await fetch(`https://api.waifu.pics/${type}/${category}`)).json()
    response.then(res=>{
        const render = document.createElement('img')
        render.className = 'pic'
        render.src = res.url
        const contentDiv = document.querySelector('.content')
        while(contentDiv.firstChild)
            contentDiv.removeChild(contentDiv.lastChild)
        contentDiv.appendChild(render)
    })
}