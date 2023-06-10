/* eslint-disable class-methods-use-this */
import { KeyValueStorage } from "./keyValueStorage";

class LocalStorage implements KeyValueStorage {
  static checkSupport(): boolean {
    const testValue = "LocalStorageSupport";

    try {
      window.localStorage.setItem(testValue, testValue);
      window.localStorage.removeItem(testValue);
    } catch (e) {
      return false;
    }

    return true;
  }

  get(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  set(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  remove(key: string): void {
    window.localStorage.removeItem(key);
  }

  listAllKeys(): Array<string> {
    return Object.keys(window.localStorage);
  }

  getBoolean(key: string, defaultValue = false): boolean {
    const value = this.get(key);
    if (value === null) {
      return defaultValue;
    }

    return ["true", "1", "yes", "on"].indexOf(value.trim().toLowerCase()) >= 0;
  }

  setBoolean(key: string, value: boolean): void {
    this.set(key, value === true ? "true" : "false");
  }

  getJSON(key: string): object | null {
    const data = this.get(key);
    if (!data) {
      return null;
    }

    return JSON.parse(data);
  }

  setJSON(key: string, value: object): void {
    const serializedValue = JSON.stringify(value);

    this.set(key, serializedValue);
  }
}

// eslint-disable-next-line import/prefer-default-export
export const localStorage = new LocalStorage();
