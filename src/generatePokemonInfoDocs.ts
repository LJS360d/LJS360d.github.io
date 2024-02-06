import {
  readFileSync,
  writeFileSync,
} from 'fs';

interface PokemonInfo {
  species: string;
  baseHP: number;
  baseAttack: number;
  baseDefense: number;
  baseSpAttack: number;
  baseSpDefense: number;
  baseSpeed: number;
  abilities: string[];
  types: string[];
}

function parsePokemonInfo(data: string): PokemonInfo[] {
  // curly braces regex
  // \{((?:[^{\}]|\{(?:[^{\}]|\{[^{\}]*\})*\})*)\}
  const regex = /\[SPECIES_(.*?)\]\s*=\s*\{((?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*)\}/g;
  const pokemonInfoList: PokemonInfo[] = [];

  let match: RegExpExecArray;
  while ((match = regex.exec(data)!)) {
    const species = match[1];
    const propertiesData = match[2];
    const properties = propertiesData
      .split('\n')
      .map((prop) => prop.trim())
      .filter((prop) => prop && !prop.startsWith('#') && prop.startsWith('.'));

    const pokemonInfo: Partial<PokemonInfo> = { species };
    properties.forEach((prop: string) => {
      const [rawKey, rawValue] = prop.split(/\s*=\s*/);
      const key = rawKey.slice(1);
      const value = rawValue.replace(/,/g, "").trim()
      const arrayValues = value.replace(/[{}]/g, "").trim().split(" ");
      pokemonInfo[key] = (arrayValues.length > 1) ? (arrayValues.map(val =>
        val.replace(/^(TYPE_|ABILITY_|EGG_GROUP_)/g, "").trim())) : Number(value) || value;

    });
    if (pokemonInfo.species && pokemonInfo.baseHP) {
      pokemonInfoList.push(pokemonInfo as PokemonInfo);
    }
  }
  return pokemonInfoList;
}


function comparePokemonInfo(oldInfo: PokemonInfo[], newInfo: PokemonInfo[]): string {
  let docs = '';
  let info = '';
  let statsAdded = false;
  
  newInfo.forEach((newPokemon) => {
    const oldPokemon = oldInfo.find((pokemon) => pokemon.species === newPokemon.species);
    
    const keys = Object.keys(oldPokemon);
    info = '';
    keys.forEach((key) => {
      // Types and Abilities
      if (oldPokemon[key] instanceof Array) {
        for (let i = 0; i < oldPokemon[key].length; i++) {
          if (key === "abilities") {
            //remove Hidden Abilities
            oldPokemon[key].splice(2);
            newPokemon[key].splice(2);
            
            if (oldPokemon[key][i] !== newPokemon[key][i] && i < 3) {
              info += `"oldAbilities":"${String(oldPokemon[key])
                .replace(/_/g, " ")
                .replace(/,/g, "/")}"\n,"newAbilities":"${String(newPokemon[key])
                  .replace(/_/g, " ")
                  .replace(/,/g, "/")}",\n`;
              break;
            }
          }
          if (key === "types") {
            if (oldPokemon[key][i] !== newPokemon[key][i] && i < 2) {
              info += `"oldType":"${String(oldPokemon[key])
                .replace(/_/g, " ")
                .replace(/,/g, "/")}"\n,"newType":"${String(newPokemon[key])
                  .replace(/_/g, " ")
                  .replace(/,/g, "/")}",\n`;
              break;
            }
          }

        }
      }
      // Stats
      if (key.includes('base') && !statsAdded) {
        if (oldPokemon[key] !== newPokemon[key]) {
          info += `"oldStats":"${oldPokemon.baseHP}/${oldPokemon.baseAttack}/${oldPokemon.baseDefense}/${oldPokemon.baseSpAttack}/${oldPokemon.baseSpDefense}/${oldPokemon.baseSpeed}",\n"newStats":"${newPokemon.baseHP}/${newPokemon.baseAttack}/${newPokemon.baseDefense}/${newPokemon.baseSpAttack}/${newPokemon.baseSpDefense}/${newPokemon.baseSpeed}",\n`;
          statsAdded = true;
        }
      }

    });
    statsAdded = false;
    if (info !== '')
      docs += `{"species":"${newPokemon.species}",\n${info.trim().substring(0, info.length - 2)}\n},`
    
  });

  return '[' + docs.substring(0, docs.length - 1) + ']';
}

function generatePokemonInfoDocs() {
  const oldData = readFileSync('data/old_info.txt', 'utf-8');
  const newData = readFileSync('data/new_info.txt', 'utf-8');

  const oldPokemonInfo = parsePokemonInfo(oldData);
  const newPokemonInfo = parsePokemonInfo(newData);

  const docs = comparePokemonInfo(oldPokemonInfo, newPokemonInfo);
  writeFileSync('data/docs_mons.json', docs, 'utf-8');
  writeFileSync('romhackdocs/public/docs_mons.json', docs, 'utf-8');
  console.log("Generated PokemonInfo JSON");
  

}
export default generatePokemonInfoDocs;