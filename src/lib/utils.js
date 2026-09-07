export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Distributes items round-robin across N columns, so columns end up an
// even-ish size apart (e.g. 5 items / 3 columns -> 2, 2, 1) rather than
// one column carrying all the leftovers. Used to build the staircase-style
// masonry grids (homepage cases + the full case-study gallery).
export function groupIntoColumns(items, numColumns) {
  const columns = Array.from({ length: numColumns }, () => []);
  items.forEach((item, i) => columns[i % numColumns].push(item));
  return columns;
}
