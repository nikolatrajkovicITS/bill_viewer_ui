import { SORT_DIRECTIONS } from '../constants';
import type {
  SortCompareFn,
  SortConfig,
  SortDirection
} from '../types/sort.types';

export const createSortCompareFn = <T>(
  key: keyof T,
  direction: SortDirection
): SortCompareFn<T> => {
  return (a: T, b: T): number => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;

    const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return direction === SORT_DIRECTIONS.ASC ? comparison : -comparison;
  };
};

export const applySorting = <T>(
  data: T[],
  sortConfig: SortConfig<keyof T> | null
): T[] => {
  if (!sortConfig) return [...data];

  const compareFn = createSortCompareFn(sortConfig.key, sortConfig.direction);
  return [...data].sort(compareFn);
};

export const toggleSortDirection = (
  currentDirection: SortDirection
): SortDirection => {
  return currentDirection === SORT_DIRECTIONS.ASC
    ? SORT_DIRECTIONS.DESC
    : SORT_DIRECTIONS.ASC;
};

export const createSortConfig = <T>(
  key: T,
  direction: SortDirection = SORT_DIRECTIONS.ASC
): SortConfig<T> =>
  ({
    key,
    direction
  }) as const;
