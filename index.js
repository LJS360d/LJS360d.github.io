const plaintext  = document.getElementById('plaintext').value;
const submitbtn  = document.getElementById('crpyt');

submitbtn.onclick = ()=>{
    console.log(encrypt(plaintext));
    document.append(encrypt(plaintext)) 
}
function encrypt(text){
    return text
}
function decrypt(text){
    return text
}