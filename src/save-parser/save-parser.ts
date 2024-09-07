import { loadGoWasmModule } from '../utils/wasm.utils';
import type { GbaData, SaveData } from './save-parser.types';

// --- Declerations to access the Go WASM module ---
declare function ParseSavBytes(buffer: Uint8Array): Promise<SaveData>;
declare function ParseGbaBytes(buffer: Uint8Array): Promise<GbaData>;

// --- Actual implementation ---
export const DEFAULT_ROM_FILENAME = 'acheron-emerald-0.0.0.gba';
export class SaveParser {
  public loadedRom: GbaData | null = null;
  protected constructor() {}

  static async init(romFilename = DEFAULT_ROM_FILENAME) { 
    loadGoWasmModule('/save-parser.wasm');
    const parser = new SaveParser();
    parser.loadInternalRomData(romFilename);
    return parser;
  }

  async loadInternalRomData(name: string) {
    const normalizedName = name.endsWith('.gba') ? name : `${name}.gba`;
    const romBuffer = await fetch(`/roms/${normalizedName}`).then(
      async (res) => new Uint8Array(await res.arrayBuffer())
    );
    return await this.loadRomData(romBuffer);
  }

  async loadRomData(rom: Uint8Array): Promise<GbaData> {
    this.loadedRom = await ParseGbaBytes(rom);
    return this.loadedRom;
  }

  async parseSav(buffer: Uint8Array): Promise<SaveData> {
    return await ParseSavBytes(buffer);
  }
}

