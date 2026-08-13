import { initListSearch } from './list-search';

type Mode = 'include_any' | 'include_all' | 'exclude_any' | 'exclude_all';

const types = new Set<string>();
const gens = new Set<string>();
let mode: Mode = 'include_any';
let diffTypes = false;
let diffStats = false;

// Row metadata is baked into `data-*` at build time; parsed once per row here.
const rowTypes = new WeakMap<HTMLElement, string[]>();

function typesOf(row: HTMLElement): string[] {
  let parsed = rowTypes.get(row);
  if (!parsed) {
    const raw = row.dataset.t ?? '';
    rowTypes.set(row, (parsed = raw ? raw.split(',') : []));
  }
  return parsed;
}

function matches(row: HTMLElement): boolean {
  if (diffTypes && row.dataset.dt !== '1') return false;
  if (diffStats && row.dataset.ds !== '1') return false;
  if (gens.size && !gens.has(row.dataset.g ?? '')) return false;
  if (!types.size) return true;

  const rowTypeList = typesOf(row);
  const any = rowTypeList.some((t) => types.has(t));
  const all = () => [...types].every((t) => rowTypeList.includes(t));
  switch (mode) {
    case 'include_any':
      return any;
    case 'exclude_any':
      return !any;
    case 'include_all':
      return all();
    case 'exclude_all':
      return !all();
  }
}

const list = initListSearch(matches);
const dialog = document.getElementById('search-filter') as HTMLDialogElement | null;

document.getElementById('list-filter-btn')?.addEventListener('click', () => dialog?.showModal());

if (dialog) {
  const controls = (kind: string) =>
    dialog.querySelectorAll<HTMLElement>(`[data-filter="${kind}"]`);

  const syncSelectAll = () => {
    const label = dialog.querySelector<HTMLElement>('[data-filter="select-all"]');
    if (label) label.textContent = types.size === 0 ? 'Select all' : 'Clear';
  };

  /** Flips membership; returns whether `value` is now selected. */
  const toggle = (set: Set<string>, value: string) => {
    if (set.delete(value)) return false;
    set.add(value);
    return true;
  };

  // One delegated listener for the whole dialog rather than a handler per control.
  const onClick: Record<string, (button: HTMLElement, value: string) => void> = {
    type(button, value) {
      button.classList.toggle('opacity-30', !toggle(types, value));
      syncSelectAll();
    },
    gen(button, value) {
      button.classList.toggle('btn-primary', toggle(gens, value));
    },
    mode(_button, value) {
      mode = value as Mode;
      for (const el of controls('mode')) {
        const active = el.dataset.value === mode;
        el.classList.toggle('btn-primary', active);
        el.classList.toggle('btn-outline', !active);
      }
      for (const hint of dialog.querySelectorAll<HTMLElement>('[data-mode-hint]')) {
        hint.hidden = hint.dataset.modeHint !== mode;
      }
    },
    'select-all'() {
      const selectAll = types.size === 0;
      types.clear();
      for (const el of controls('type')) {
        if (selectAll) types.add(el.dataset.value!);
        el.classList.toggle('opacity-30', !selectAll);
      }
      syncSelectAll();
    },
  };

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) return dialog.close();
    const button = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-filter]');
    const handler = button && onClick[button.dataset.filter!];
    if (!button || !handler) return;
    event.preventDefault();
    handler(button, button.dataset.value!);
    list.refresh();
  });

  dialog.addEventListener('change', (event) => {
    const input = event.target as HTMLInputElement;
    if (input.dataset.filter === 'diff-types') diffTypes = input.checked;
    else if (input.dataset.filter === 'diff-stats') diffStats = input.checked;
    else return;
    list.refresh();
  });
}
