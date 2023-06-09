const availableBadges = []
unlockAllBadges()
const badgesDiv = document.querySelector('.badge-selector')

availableBadges.forEach(badge => {
    badgesDiv.innerHTML += `<i class="fa ${badge} badge-selector-item" 
    onclick = "document.querySelector('.current-badge').className = 'fa ${badge} current-badge';localStorage.setItem('badge', '${badge}')"></i>`
})

function unlockAllBadges(){
    availableBadges.push('fa-user');
    availableBadges.push('fa-heart');
    availableBadges.push('fa-star');
    availableBadges.push('fa-bolt');
    availableBadges.push('fa-ghost');
    availableBadges.push('fa-umbrella');
    availableBadges.push('fa-feather');
    availableBadges.push('fa-fish');
    availableBadges.push('fa-snowflake');
    availableBadges.push('fa-fire');
    availableBadges.push('fa-bomb');
    availableBadges.push('fa-mug-hot');
    availableBadges.push('fa-rocket');
    availableBadges.push('fa-paper-plane');
}