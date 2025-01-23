export default function useLocalStorage() {
  function get(key: string): string | undefined {
    let value: undefined | string;

    if (typeof window !== "undefined") {
      value = window.localStorage.getItem(key) || undefined;
    } else {
      value = undefined;
    }

    return value;
  }

  function set(key: string, value: string): void {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value);
    }
  }

  function remove(key: string): void {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  }

  return { get, set, remove };
}
