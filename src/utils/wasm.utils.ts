import '../../public/wasm_exec.js';
declare class Go {
  run(instance: WebAssembly.Instance): void;
  importObject: WebAssembly.Imports;
}

export async function loadGoWasmModule(path: string) {
  const go = new Go();
  const result = await WebAssembly.instantiateStreaming(
    fetch(path),
    go.importObject
  );
  go.run(result.instance);
  return result.instance.exports;
}
