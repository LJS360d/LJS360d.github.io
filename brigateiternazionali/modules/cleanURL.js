export function cleanURL(){
    history.pushState(null, null, window.location.href.split('?')[0])
}