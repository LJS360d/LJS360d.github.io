import './wasm_exec.js';
declare class Go {
  run(instance: WebAssembly.Instance): void;
  importObject: WebAssembly.Imports;
}

async function loadGoWasmModule(path: string) {
  const go = new Go();
  const result = await WebAssembly.instantiateStreaming(
    fetch(path),
    go.importObject
  );
  go.run(result.instance);
  return result.instance.exports;
}

declare function DecodeSaveData(buffer: Uint8Array): Promise<any>;
export class SaveParser {
  protected constructor() {}

  static async init() {
    loadGoWasmModule('/main.wasm');
    return new SaveParser();
  }

  async parse(buffer: Uint8Array): Promise<SaveData> {
    return await DecodeSaveData(buffer);
  }
}

interface SaveData {
  // "trainer": save.Trainer.toJS(),
  // "pokedex":  save.Pokedex.toJS(),
  team: Pokemon[];
	// "bag":  save.Bag.toJS(),
  pc: PC;
}

interface PC {
  currentBox: number;
  pokemon: Pokemon[];
  boxNames: string;
}

interface Pokemon {
  nickname: string;
  species: string;
  item: string;
  level: string;
  toSDExportFormat: () => string;
}