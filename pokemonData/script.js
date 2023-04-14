class PokemonData {
    constructor(json) {
        console.log(json);
        this.name = json['name']
        this.front_sprite = json['sprites'].front_default;
        this.pokedex_number = json['id']
        this.moves = json['moves']
        this.types = []
        for (const typeData of json['types']) {
            this.types.push(typeData.type.name)
        }
        this.abilities = [] 
        for (const abilityData of json['abilities']) {
            this.abilities.push(abilityData.ability.name)
        }
        this.stats = new Map()
        for (const statData of json['stats']) {
            const statName = statData.stat.name
            this.stats.set(statName,statData.base_stat)
        }
        for (const key in this) {
            console.log(key,this[key]);
        }
    }
}
class MoveData {
    constructor(json) {
        this.type = json['type'].name
        this.base_power = json['power'] ?? '0'
    }
}
function clearRender() {
    const renderLeft = document.querySelector('.render-left')
    const renderRight = document.querySelector('.render-right')
    while (renderLeft.firstChild)
        renderLeft.removeChild(renderLeft.lastChild)
    while (renderRight.firstChild)
        renderRight.removeChild(renderRight.lastChild)
}
async function renderPokemonData(pkmnName) {
    console.time('Pokémon Rendered')
    clearRender()
    const pkmnData = new PokemonData(await getPokemonDataConstructor(pkmnName))
    renderPokemonSprite(pkmnData)
    renderPokemonMoves(pkmnData)
    console.timeEnd('Pokémon Rendered')
    async function renderPokemonSprite(pkmnData) {
        const spriteImg = document.createElement('img');
        spriteImg.className = 'pkmn-sprite'
        spriteImg.src = pkmnData.front_sprite;
        document.querySelector('.render-left').appendChild(spriteImg)
    }
    async function renderPokemonMoves(pkmnData) {
        for (const moveDataResponse of pkmnData.moves) {

            const moveName = moveDataResponse.move.name;
            const moveUrl = moveDataResponse.move.url
            const moveData = await fetch(moveUrl).then(res => {
                return new Promise((resolve, reject) => {
                    res.json()
                        .then((moveData) => {
                            resolve(new MoveData(moveData))
                        }, (err) => { reject(err) })
                })
            })
            const moveColor = getTypeColor(moveData.type);
            const movePower = moveData.base_power
            const moveRender = document.createElement('div')
            moveRender.innerHTML += `
            <h5>${moveName} ${movePower == '0' ? '' : movePower}</h5>
            `;
            moveRender.className = 'move'


            moveRender.style.backgroundColor = moveColor
            const renderRight = document.querySelector('div.render-right')
            renderRight.appendChild(moveRender)

        }
    }
    function getTypeColor(typeString) {
        switch (typeString) {
            case 'normal': return '#A8A77A'
            case 'fire': return '#EE8130'
            case 'water': return '#6390F0'
            case 'grass': return '#7AC74C'
            case 'electric': return '#F7D02C'
            case 'ice': return '#96D9D6'
            case 'fighting': return '#C22E28'
            case 'poison': return '#A33EA1'
            case 'ground': return '#E2BF65'
            case 'flying': return '#A98FF3'
            case 'psychic': return '#F95587'
            case 'bug': return '#A6B91A'
            case 'rock': return '#B6A136'
            case 'ghost': return '#735797'
            case 'dragon': return '#6F35FC'
            case 'dark': return '#705746'
            case 'steel': return '#B7B7CE'
            case 'fairy': return '#D685AD'
            default: return '#ffffff'
        }
    }
    async function getPokemonDataConstructor(pkmnName) {
        try {
            return (await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnName}`)).json((pkmnData)=>{return pkmnData})
        } catch (err) {
            throw err
        }
    }
}

document.getElementById('searchinput').addEventListener('keydown', async function (e) {
    if (e.key == "Enter") {
        const pkmnName = String(this.value).toLowerCase()
        await renderPokemonData(pkmnName)
        this.value = ''
    }
})
document.getElementById('searchbutton').onclick = async () => {
    const pkmnName = String(document.getElementById('searchinput').value).toLowerCase()
    await renderPokemonData(pkmnName)
    document.getElementById('searchinput').value = ''
}
