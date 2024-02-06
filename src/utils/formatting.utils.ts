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
