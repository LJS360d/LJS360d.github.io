
const plaintext  = document.getElementById('plaintext');
window.onclick = ()=>
document.getElementById("btn").onclick =()=>{
    if(!['',' '].includes(document.getElementById("key").value)) {
        const caesar = getEncryptedAlphabet(document.getElementById("key").value)
        const cmsg = document.createElement('div')
        cmsg.textContent = encrypt(plaintext.value,caesar)
        cmsg.className = 'cmsg'
        document.getElementById('encrypted').append(cmsg)
        cmsg.onclick = ()=>{
                document.getElementById('encrypted').removeChild(cmsg)
                document.getElementById('decrypted').append(cmsg)
                cmsg.textContent = decrypt(cmsg.textContent,caesar)
    }
    }
}
function encrypt(text,key){
    let msg = '';
    for (let i = 0; i < text.length; i++) {
        if(text[i]==' ') {msg += text[i]; continue}
        msg += key.get(text[i]) 
    }
    return msg
}
function decrypt(text,key){
    let msg = '';
    for (let i = 0; i < text.length; i++) {
        if(text[i]==' ') {msg += ' '; continue}
        msg +=  getByValue(key,text[i])
    }
    return msg
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