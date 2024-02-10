export function debounce(func: (...args: any) => any, delay: number) {
  let debounceTimer: NodeJS.Timeout;
  return function () {
    // biome-ignore lint/style/noArguments: let me fucking do debounce
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
}
