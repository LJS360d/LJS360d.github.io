// Alternate-form tabs. Every panel is already in the HTML; one delegated
// listener handles the whole page, so cost is constant per card count.
document.addEventListener('click', (event) => {
  const tab = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-form-tab]');
  const group = tab?.closest<HTMLElement>('[data-form-group]');
  if (!tab || !group) return;

  for (const el of group.querySelectorAll<HTMLElement>('[data-form-tab]')) {
    el.classList.toggle('tab-active', el === tab);
  }
  for (const panel of group.querySelectorAll<HTMLElement>('[data-form-panel]')) {
    panel.hidden = panel.dataset.formPanel !== tab.dataset.formTab;
  }
});
