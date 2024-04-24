import { isObject, getFieldValue } from "./object";

export function initFieldErrors(form, fieldErrors) {
  for (const field in form) {
    if (isObject(form[field])) {
      fieldErrors[field] = {};
      initFieldErrors(form[field], fieldErrors[field]);
    } else {
      fieldErrors[field] = getFieldErrorObject();
    }
  }
}

export function getFieldErrorObject() {
  return {
    hasError: false,
    validationStatus: undefined,
    feedback: undefined,
  };
}

export function resetFieldErrors(form, fieldErrors) {
  for (const field in fieldErrors) {
    if (isObject(form[field])) {
      resetFieldErrors(form[field], fieldErrors[field]);
    } else {
      fieldErrors[field] = getFieldErrorObject();
    }
  }
}

export function setValidationErrors(form, fieldErrors, validationErrors) {
  resetFieldErrors(form, fieldErrors);
  for (const nestedErrors of validationErrors) {
    for (const error of nestedErrors) {
      const field = error.field;
      const fieldError = getFieldValue(fieldErrors, field);
      fieldError.hasError = true;
      fieldError.feedback = error.message;
      fieldError.validationStatus = "error";
    }
  }
}

export function setErrors(form, fieldErrors, errors) {
  resetFieldErrors(form, fieldErrors);
  for (const key in errors) {
    if (isObject(errors[key])) {
      setErrors(form[key], fieldErrors[key], errors[key]);
      continue;
    }
    fieldErrors[key].hasError = true;
    fieldErrors[key].feedback = errors[key];
    fieldErrors[key].validationStatus = "error";
  }
}
