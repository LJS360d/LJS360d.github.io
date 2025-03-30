export function updateList<T extends Record<string, any>>(
  event: Event,
  elements: HTMLLIElement[],
  searchAttr = 'data-name'
) {
  const searchText = (event as CustomEvent).detail.text.toUpperCase();
  const filters = (event as CustomEvent).detail.filters as T | null;

  for (const element of elements) {
    let shouldShow = true;

    // Search text filtering
    if (searchText !== '') {
      const searchable = element.getAttribute(searchAttr);
      if (!searchable?.toUpperCase().includes(searchText)) {
        shouldShow = false;
      }
    }

    // Generic filters filtering
    if (filters && Object.keys(filters).length && shouldShow) {
      for (const filterKey in filters) {
        const filterValue = filters[filterKey];
        if (filterValue === null && filterValue === undefined) continue;
        const dataAttributeKey = `data-${filterKey}`;
        const dataAttribute = element.getAttribute(dataAttributeKey);

        if (dataAttribute === null) {
          continue;
        }
        try {
          if (typeof filterValue === 'boolean') {
            shouldShow = dataAttribute === String(filterValue);
            continue;
          }
          if (Array.isArray(filterValue)) {
            const dataArray = JSON.parse(dataAttribute) as any[];
            if (dataArray.length === 0) {
              continue;
            }
            shouldShow = !dataArray.some((value) => filterValue.includes(value));

            continue;
          }
          if (typeof filterValue === 'number') {
            shouldShow = Number.parseInt(dataAttribute, 10) === filterValue;
            continue;
          }
          if (typeof filterValue === 'string') {
            shouldShow = dataAttribute === filterValue;
            continue;
          }
          // Handle other types as needed or throw an error
          shouldShow = String(filterValue) === dataAttribute;
        } catch (e) {
          console.error(e);
          break;
        }

        if (!shouldShow) {
          break;
        }
      }
    }

    element.hidden = !shouldShow;
  }

  const searchEndEvent = new CustomEvent('searchEnd', {
    detail: { searchText },
  });
  document.dispatchEvent(searchEndEvent);
}
