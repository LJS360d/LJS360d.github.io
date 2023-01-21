const mouseTrails = document.querySelectorAll('.cursor-trail')
const trailCoords = {x:0,y:0}
let delay=500,count=0;
mouseTrails.forEach(trail=>{
    trail.x = 0;
    trail.y = 0;
})
window.onmousemove=(e)=>{
    trailCoords.x = e.clientX 
    trailCoords.y = e.clientY 
}
window.addEventListener('keypress',(e)=>{
    if(['X','x','Z','z'].includes(e.key)){
        window.dispatchEvent(new MouseEvent("click", {
            view: window,
            screenX:e.clientX,
            screenY:e.clientY
        }))}
})
animateTrail()
function animateTrail(){
    let x = trailCoords.x, y = trailCoords.y;
    mouseTrails.forEach((trail,index)=>{
        trail.style.left = x-12+'px';
        trail.style.top = y-12+'px';
        trail.style.scale = (0-index)/(mouseTrails.length);
        trail.x = x;
        trail.y = y;
        const nextTrail = mouseTrails[index+1] || mouseTrails[0];
        x+= (nextTrail.x - x) * 0.3;
        y+= (nextTrail.y - y) * 0.3;
    });
    requestAnimationFrame(animateTrail)
}
setInterval(spawnCircles,delay)
function spawnCircles(){
    const circle = document.createElement('div');
    circle.className = 'circle'
    circle.innerHTML = 1+(count++)%10
    circle.style.top = Math.floor(Math.random() * 99)+'vh'
    circle.style.left = Math.floor(Math.random() * 99)+'vw'
    document.getElementById('background-grid').append(circle)
    circle.onmouseover=()=>{
        setTimeout(()=>{circle.parentNode.removeChild(circle)},500)
        circle.style.backgroundColor = 'red'
    } 
}

