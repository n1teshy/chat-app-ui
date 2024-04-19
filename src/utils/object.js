export function isObject(value) {
  return (
    value &&
    !Array.isArray(value) &&
    typeof value === "object" &&
    !(value instanceof Date)
  );
}

export function getFieldValue(object, field) {
  const fieldSplits = field.split(".");
  for (let i = 0; i < fieldSplits.length; i++) {
    const currentField = fieldSplits[i];
    if (i == fieldSplits.length - 1) {
      return object[currentField];
    } else {
      if (object[currentField] == undefined) {
        return undefined;
      }
      object = object[currentField];
    }
  }
}

export function resetFields(object, recursive = true) {
  for (const field in object) {
    if (recursive && isObject(object[field])) {
      resetFields(object[field], recursive);
    } else {
      object[field] = null;
    }
  }
}
