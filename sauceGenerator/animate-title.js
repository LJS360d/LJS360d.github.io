const title = document.getElementById("title");
const titleText = title.textContent;
const titleLetters = titleText.split("");

title.innerText = "";

titleLetters.forEach((letter, index) => {
    const letterSpan = document.createElement("span");
    letterSpan.textContent = letter;
    letterSpan.classList.add('letter')
    letterSpan.style.animationDelay = `${index * 0.1}s`;
    title.appendChild(letterSpan);
});

title.addEventListener('mouseenter', function () {
    document.documentElement.style.setProperty('--c', getRandomColor(true));
    function getRandomColor(isHot) {
        const hue = isHot ? Math.floor(Math.random() * 60) + 10 : Math.floor(Math.random() * 180) + 180;
        const saturation = Math.floor(Math.random() * 50) + 50;
        const lightness = Math.floor(Math.random() * 20) + 40;
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        return color;
    }
})
