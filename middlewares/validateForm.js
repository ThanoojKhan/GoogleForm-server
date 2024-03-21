function validateSubmission(form, submission) {
  const errors = [];

  for (const field of form.fields) {
    const value = submission[field.name];

    if (field.required && !value) {
      errors.push(`The field "${field.name}" is required.`);
      return errors;
    }

    if (field.type === 'radio' && !field.options.includes(value)) {
      errors.push(`The field "${field.name}" must be one of the following options: ${field.options.join(', ')}`);
    }
  }

  return errors;
}

module.exports = validateSubmission;
