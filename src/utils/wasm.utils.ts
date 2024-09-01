import './wasm_exec.js'
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

  async parse(buffer: Uint8Array): Promise<any> {
    return await DecodeSaveData(buffer);
  }
}
