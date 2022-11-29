const plaintext  = document.getElementById('plaintext') as HTMLInputElement;
const submitbtn  = document.getElementById('crpyt') as HTMLInputElement;

submitbtn.onclick = ()=>{
    console.log(plaintext.value);
    document.append(plaintext.value) 
}