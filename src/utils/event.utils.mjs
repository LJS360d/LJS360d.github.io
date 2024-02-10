/**
 * Debounces a function call, ensuring that it is only invoked after a certain delay
 * has passed since the last time it was invoked.
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The delay in milliseconds to wait before invoking the function.
 * @returns {() => void} A new function that debounces the original function.
 */
export function debounce(func, delay) {
  let debounceTimer;

  return function () {
    const context = this;
    // biome-ignore lint/style/noArguments: biome stfu this is js not ts
    const args = arguments;
    clearTimeout(debounceTimer);
    // biome-ignore lint/complexity/useArrowFunction: biome stfu this is js not ts
    debounceTimer = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}
