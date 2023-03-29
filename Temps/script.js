const cities = [
    "Trento", "Milano", "Torino", "Firenze", "Bologna", "Roma", "Napoli", "Bari", "Messina"
]
buildCitiesSelect(cities)

function buildCitiesSelect(cities) {
    const citiesSelect = document.getElementById('cities')
    cities.forEach((value) => {
        const option = document.createElement('option')
        option.value = value;
        option.innerText = value;
        citiesSelect.appendChild(option)
    })
}
function submitTemps() {
    const city = document.getElementById('cities').value
    const timestamp = new Date().getTime();
    let minTemp = document.getElementById('minTemp').value
    let maxTemp = document.getElementById('maxTemp').value
    sessionStorage.setItem(String(timestamp),
        `{
        "city":"${city}",
        "minTemp":"${minTemp}",
        "maxTemp":"${maxTemp}",
        "timestamp":"${timestamp}"
        }`
    )
    document.getElementById('minTemp').value = null
    document.getElementById('maxTemp').value = null
    console.log(sessionStorage.getItem(timestamp));

}