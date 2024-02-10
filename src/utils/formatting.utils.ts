export function toTitleCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function toCapitalized(str: string): string {
  return str
    .toLowerCase()
    .split(/[\s_-]+/g)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function toKebabCase(str: string): string {
  return str
    .replaceAll('_', '-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}
