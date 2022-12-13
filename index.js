const mouseTrails = document.querySelectorAll('.cursor-trail')
const trailCoords = {x:0,y:0}
mouseTrails.forEach(trail=>{
    trail.x = 0;
    trail.y = 0;
})
window.onmousemove=(e)=>{
    trailCoords.x = e.clientX 
    trailCoords.y = e.clientY 
}
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
animateTrail()

