export function toCapitalized(str: string): string {
  return str
    .toLowerCase()
    .split(/[\s_-]+/g)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
