export function showSnackbar(label, color) {
    let labelColor = "#fff"
    const oldSnackbar = document.querySelector('.snackbar')
    if (oldSnackbar)
        removeSnackbar(oldSnackbar)
    if (color)
        labelColor = color ?? "#fff"
    const snackbar = document.createElement('div')
    snackbar.innerHTML += `
    <div class="snackbar-content">
    <label style="color:${labelColor};">${label ?? "My guy...put a label"}</label>
    <span class="close" onclick="document.body.removeChild(this.parentElement.parentElement)">&times;</span>
    </div>
    `;
    snackbar.className = 'snackbar'
    document.body.appendChild(snackbar);
    setTimeout(() => {
        snackbar.className.replace("show", "");
        if (document.querySelector('.snackbar'))
            removeSnackbar(snackbar)
    }, 2500)
}
function removeSnackbar(snackbar) {
    document.body.removeChild(snackbar)
}
export function showSnackbarGreenText(label) {
    showSnackbar(label, "#20e036")
}