
const plaintext  = document.getElementById('plaintext');
window.onclick = ()=>
document.getElementById("btn").onclick =()=>{
    if(!['',' '].includes(document.getElementById("key").value)) {
        const key = getEncryptedAlphabet(document.getElementById("key").value)
        const cmsg = document.createElement('div')
        const encryptFun = encrypt()
        const decryptFun = decrypt()
        cmsg.textContent = encryptFun(plaintext.value,key)
        cmsg.className = 'cmsg'
        document.getElementById('encrypted').append(cmsg)
        cmsg.onclick = ()=>{
                document.getElementById('encrypted').removeChild(cmsg)
                document.getElementById('decrypted').append(cmsg)
                cmsg.textContent = decryptFun(cmsg.textContent,key)}
    }
}
function encrypt(){
    switch(document.getElementById('algorithm').value){
        case "Caesar" : return caesarEncrypt;
        case "Iliad" : return iliadEncrypt;
        case "Caesar" : return caesarEncrypt;
        case "Caesar" : return caesarEncrypt;
        case "Caesar" : return caesarEncrypt;
        default: return (text)=>{return text}
    }
}
function decrypt(){
    switch(document.getElementById('algorithm').value){
        case "Caesar" : return caesarDecrypt;
        case "Iliad" : return iliadDecrypt;
        case "Caesar" : return caesarDecrypt;
        case "Caesar" : return caesarDecrypt;
        case "Caesar" : return caesarDecrypt;
        default: return (text)=>{return text}
    }
}
function getEncryptedAlphabet(key){
    //monkey brain neuron activation 
    let alphabet = [], cryptedalphabet = [],map = new Map();
    for (let i = 0; i < 256; i++) {
        alphabet.push(String.fromCharCode(i))
    }
    cryptedalphabet = alphabet
    for (let j = 0; j < key%alphabet.length; j++) {
        cryptedalphabet.push(cryptedalphabet.shift())
    }
    let k = 65;
    cryptedalphabet.forEach((cchar)=>{
        map.set(String.fromCharCode(k++),cchar)
    })
    return map;
}
function getByValue(map, searchValue) {
    for (let [key, value] of map.entries()) {
      if (value === searchValue)
        return key;
    }
}
function caesarEncrypt(text,key){
    let msg = '';
    for (let i = 0; i < text.length; i++) {
        if(text[i]==' ') {msg += text[i]; continue}
        msg += key.get(text[i]) 
    }
    return msg
}
function caesarDecrypt(text,key){
    let msg = '';
    for (let i = 0; i < text.length; i++) {
        if(text[i]==' ') {msg += ' '; continue}
        msg +=  getByValue(key,text[i])
    }
    return msg
}
function iliadEncrypt(text){
    const key = "αβγδεζηθικμνξοπρςτυχψω"
}
function iliadDecrypt(text){}

window.addEventListener('keypress',(e)=>{
    document.getElementById('code').textContent = e.key+' '+e.keyCode
})