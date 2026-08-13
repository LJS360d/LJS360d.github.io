export interface ListSearch {
  /** Re-applies the current query and predicate on the next frame. */
  refresh(): void;
}

/**
 * Search over a statically rendered list. Rows are build-time HTML carrying a
 * pre-lowercased `data-s` haystack, so filtering is one `String.includes` pass
 * over an array captured at startup — no data and no framework on the client.
 */
export function initListSearch(
  extraPredicate?: (row: HTMLElement) => boolean
): ListSearch {
  const input = document.getElementById('list-search') as HTMLInputElement | null;
  const root = document.getElementById('list-root');
  if (!input || !root) return { refresh() {} };

  const rows = Array.from(root.children) as HTMLElement[];
  const keys = rows.map((row) => row.dataset.s ?? '');
  const empty = document.getElementById('list-empty');

  let pending = false;
  let query = '';

  const apply = () => {
    pending = false;
    let shown = 0;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const hide =
        (query !== '' && !keys[i].includes(query)) ||
        (extraPredicate !== undefined && !extraPredicate(row));
      // `hidden` is a property access, so this never forces a reflow.
      if (row.hidden !== hide) row.hidden = hide;
      if (!hide) shown++;
    }
    if (empty) empty.hidden = shown !== 0;
  };

  // rAF coalesces to at most one pass per painted frame — cheaper and more
  // responsive than a debounce. Flag is set before scheduling so the guard
  // holds whenever the callback runs.
  const schedule = () => {
    query = input.value.trim().toLowerCase();
    if (pending) return;
    pending = true;
    requestAnimationFrame(apply);
  };

  input.addEventListener('input', schedule);

  window.addEventListener('keydown', (event) => {
    if (event.key === 'k' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      input.focus();
      input.select();
    }
  });

  // Browsers restore input values on back-navigation.
  if (input.value) schedule();

  return { refresh: schedule };
}
