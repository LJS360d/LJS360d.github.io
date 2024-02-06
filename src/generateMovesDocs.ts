import {
  readFileSync,
  writeFileSync,
} from 'fs';

interface MoveInfo {
    name: string;

}

function parseMoveInfo(data: string): MoveInfo[] {
    // curly braces regex
    // \{((?:[^{\}]|\{(?:[^{\}]|\{[^{\}]*\})*\})*)\}
    const regex = /\[MOVE_(.*?)\]\s*=\s*\{((?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*)\}/g;
    const moveInfoList: MoveInfo[] = [];

    let match: RegExpExecArray;
    while ((match = regex.exec(data)!)) {
        const name = match[1];

        const propertiesData = match[2];
        const properties = propertiesData
            .split('\n')
            .map((prop) => prop.trim())
            .filter((prop) => prop && !prop.startsWith('#') && prop.startsWith('.'));

        const moveInfo: Partial<MoveInfo> = { name };
        properties.forEach((prop: string) => {
            const [rawKey, rawValue] = prop.split(/\s*=\s*/);
            const key = rawKey.slice(1);
            const value = rawValue.replace(/,/g, "").trim()
            moveInfo[key] = Number(value) || value;

        });

        if (moveInfo.name)
            moveInfoList.push(moveInfo as MoveInfo);

    }
    return moveInfoList;
}
function compareMoveInfo(oldInfo: MoveInfo[], newInfo: MoveInfo[]): string {
    const capitalize = (str: string) => { return str.charAt(0).toUpperCase() + str.slice(1) }
    let docs = '';
    let info = '';
    newInfo.forEach((newMove) => {
        const oldMove = oldInfo.find((move) => move.name === newMove.name);
        const keys = Object.keys(oldMove);
        info = '';
        keys.forEach((key) => {
            if (oldMove[key] !== newMove[key])
                info += `"old${capitalize(key)}":"${oldMove[key]}","new${capitalize(key)}":"${newMove[key]}",`

        });
        if (info !== '')
            docs += `{"name":"${newMove.name}",\n${info.trim().substring(0, info.length - 1)}\n},`
    });
    return '[' + docs.substring(0, docs.length - 1) + ']';
}
function generateMovesInfo() {
    const oldData = readFileSync('data/old_moves.h', 'utf-8');
    const newData = readFileSync('data/new_moves.h', 'utf-8');
    const oldMoveInfo = parseMoveInfo(oldData);
    const newMoveInfo = parseMoveInfo(newData);
    const docs = compareMoveInfo(oldMoveInfo, newMoveInfo);
    writeFileSync('data/docs_moves.json', docs, 'utf-8');
    writeFileSync('romhackdocs/public/docs_moves.json', docs, 'utf-8');
    console.log("Generated Moves JSON");

}
export default generateMovesInfo;

