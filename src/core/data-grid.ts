import type { BissColumn } from './types';
import { sortRows } from './collections';
/** Pure grid geometry/state; both renderers consume this exact model. */
export function dataGridModel<T extends { id: string } & Record<string, unknown>>(options: {
  availableWidth?: number;
  rows: readonly T[];
  columns: readonly BissColumn[];
  selected?: readonly string[];
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
}) {
  const { rows, columns, selected = [], sortKey = '', sortDirection = 'asc' } = options;
  const visible = columns
    .filter((c) => c.visible)
    .sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned));
  const ids = new Set(selected),
    rowIds = new Set(rows.map((r) => r.id));
  const selectedCount = rows.filter((r) => ids.has(r.id)).length;
  let left = 44;
  const geometry = new Map(
    visible.map((c) => {
      const width = Math.max(60, Math.min(800, Number.isFinite(c.width) ? c.width! : 160));
      const offset = c.pinned ? left : undefined;
      if (c.pinned) left += width;
      return [c.key, { width, left: offset }] as const;
    }),
  );
  const lastFlexible = [...visible].reverse().find((c) => !c.pinned);
  const total = 44 + Array.from(geometry.values()).reduce((sum, c) => sum + c.width, 0);
  if (lastFlexible && (options.availableWidth ?? 0) > total) {
    const cell = geometry.get(lastFlexible.key)!;
    geometry.set(lastFlexible.key, {
      ...cell,
      width: cell.width + options.availableWidth! - total,
    });
  }
  return {
    width: 44 + Array.from(geometry.values()).reduce((sum, c) => sum + c.width, 0),
    visible,
    sorted: sortRows(rows, sortKey, sortDirection),
    selectedCount,
    allSelected: rows.length > 0 && selectedCount === rows.length,
    someSelected: selectedCount > 0 && selectedCount < rows.length,
    geometry: (key: string) => geometry.get(key) ?? { width: 160, left: undefined },
    selectAll: (checked: boolean) =>
      checked
        ? Array.from(new Set([...selected, ...rowIds]))
        : selected.filter((id) => !rowIds.has(id)),
    toggleRow: (id: string) =>
      ids.has(id) ? selected.filter((value) => value !== id) : [...selected, id],
    resizeColumn: (key: string, width: number) =>
      columns.map((c) =>
        c.key === key
          ? { ...c, width: Math.max(60, Math.min(800, Number.isFinite(width) ? width : 160)) }
          : c,
      ),
  };
}
