export function mapObjectsToOptions(
  objects,
  labelField,
  valueField,
  { sort = true, addDeselect = true } = {},
) {
  const options = objects.map((object) => ({
    label: object[labelField],
    value: object[valueField],
  }));
  if (sort) {
    options.sort((a, b) =>
      a.label.localeCompare(b.label, "en", { numeric: true }),
    );
  }
  if (addDeselect) {
    options.unshift({ label: "Clear", value: null });
  }
  return options;
}
