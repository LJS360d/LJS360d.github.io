export function setBackground(url){
    document.documentElement.style.setProperty('--bgUrl', `url(${url})`);
}