export function updateList(
  event: Event,
  elements: HTMLLIElement[],
  searchAttr = 'data-name'
) {
  const searchText = (event as CustomEvent).detail.text.toUpperCase();
  for (const element of elements) {
    if (searchText === '') {
      element.hidden = false;
      continue;
    }
    const searchable = element.getAttribute(searchAttr);
    element.hidden = !searchable?.includes(searchText);
  }
  const searchEndEvent = new CustomEvent('searchEnd', {
    detail: { searchText },
  });
  document.dispatchEvent(searchEndEvent);
}
