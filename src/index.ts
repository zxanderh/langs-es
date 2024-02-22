/* eslint-disable no-var */
import type { Language } from './language.interface';
import data from './data';

var partDesignators = [1, 2, 3, '1', '2', '2B', '2T', '3'] as const;
type Part = (typeof partDesignators)[number];

var langs = {
  all,
  has,
  codes,
  names,
  where,
  isValidPart,
};

export default langs;

/**
 * @description Get all languages from ISO 639 (including macro-, extinct, and constructed languages).
 */
export function all(): Language[] {
  return data;
}

/**
 * @description Convenience function that returns only living languages.
 */
export function living(): Language[] {
  return filter(data, (lang) => lang.type === 'L');
}

/**
 * @description Returns a dataset comparable to that returned by the original `langs.all()`
 */
export function legacy(): Language[] {
  return filter(data, (lang) => Boolean(lang[1] && lang[2] && lang[3] && lang['2B'] && lang.local));
}

/**
 * @description Check whether a `Language` entry exists for a given property name and value.
 * @param crit An ownEnumeratedProperty of `Language`
 * @param val The value to check against
 */
export function has(crit: keyof Language, val: string) {
  return void(0) !== where(crit, val);
}

/**
 * @description Get all language codes for a given ISO639 part.
 * @param part An ISO639 part designator
 * @returns The available language codes for the requested part.
 */
export function codes(part: string | number) {
  if (isValidPart(part)) {
    return reduce(data, (codes: string[], row) => {
      if (row[part]) {
        codes.push(row[part]!);
      }
      return codes;
    }, []);
  }
  return [];
}

/**
 * @description Get names for all available languages.
 * @param local Whether to return local or English names. If `true` and no local name is available, the value will be `null`.
 * @returns The names of all available languages.
 */
export function names(local: boolean) {
  return map(data, (row) => local ? row.local : row.name);
}

/**
 * @description Get a `Language` entry from a given property name and value.
 * @param crit An ownEnumeratedProperty of `Language`
 * @param val The value to check against
 * @returns The first `Language` entry found with the given property value.
 */
export function where(crit: keyof Language, val: string) {
  for (var i = 0; i < data.length; i++) {
    if (val === data[i][crit]) {
      return data[i];
    }
  }
}

export function isValidPart(part: unknown): part is Part {
  return -1 !== partDesignators.indexOf(part as Part);
}

// #region polyfills

function filter<T>(arr: T[], fn: (v: T, i: number) => boolean): T[] {
  var out: T[] = [];
  for(var i = 0; i < arr.length; i++){
    if(fn(arr[i], i)){
      out.push(arr[i]);
    }
  }
  return out;
}

function map<T, U>(arr: T[], fn: (v: T, i: number) => U): U[] {
  var out: U[] = [];
  for(var i = 0; i < arr.length; i++){
    out[i] = fn(arr[i], i);
  }
  return out;
}

function reduce<T, U>(arr: T[], fn: (p: U, c: T, i: number, arr: T[]) => U, initialValue: U): U {
  var out = initialValue;
  for (var i = 0; i < arr.length; i++) {
    if (out !== undefined) {
      out = fn(out, arr[i], i, arr);
    } else {
      out = arr[i] as unknown as U;
    }
  }
  return out;
}

// #endregion
