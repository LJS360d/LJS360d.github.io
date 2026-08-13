import { loadGoWasmModule } from '../utils/wasm.utils';
import type { GbaData, SaveData } from './save-parser.types';

// Exported by the Go WASM module onto globalThis.
declare function ParseSavBytes(buffer: Uint8Array): Promise<SaveData>;
declare function ParseGbaBytes(buffer: Uint8Array): Promise<GbaData>;

export const DEFAULT_ROM_FILENAME = 'acheron-emerald-0.0.0.gba';

/** The wasm module (4.3 MB) and bundled ROM (32 MB) are fetched on first use. */
export class SaveParser {
  public loadedRom: GbaData | null = null;

  private wasm: Promise<unknown> | null = null;
  private rom: Promise<GbaData> | null = null;

  static init() {
    return new SaveParser();
  }

  /** Safe to call repeatedly; fetches happen at most once. */
  preload(): void {
    void this.ensureRom().catch(() => {});
  }

  private ensureWasm(): Promise<unknown> {
    this.wasm ??= loadGoWasmModule('/save-parser.wasm');
    return this.wasm;
  }

  private ensureRom(): Promise<GbaData> {
    this.rom ??= this.loadInternalRomData(DEFAULT_ROM_FILENAME);
    return this.rom;
  }

  async loadInternalRomData(name: string): Promise<GbaData> {
    const normalizedName = name.endsWith('.gba') ? name : `${name}.gba`;
    const [, romBuffer] = await Promise.all([
      this.ensureWasm(),
      fetch(`/roms/${normalizedName}`).then(
        async (res) => new Uint8Array(await res.arrayBuffer())
      ),
    ]);
    return this.applyRom(romBuffer);
  }

  /** User-supplied ROM: skips the bundled 32 MB download entirely. */
  async loadRomData(rom: Uint8Array): Promise<GbaData> {
    await this.ensureWasm();
    const loaded = await this.applyRom(rom);
    this.rom = Promise.resolve(loaded);
    return loaded;
  }

  async parseSav(buffer: Uint8Array): Promise<SaveData> {
    await this.ensureRom();
    return await ParseSavBytes(buffer);
  }

  private async applyRom(rom: Uint8Array): Promise<GbaData> {
    this.loadedRom = await ParseGbaBytes(rom);
    return this.loadedRom;
  }
}
