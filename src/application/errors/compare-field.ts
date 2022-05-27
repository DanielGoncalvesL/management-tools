export class CompareFieldsError extends Error {
  constructor(field: string, compareField: string) {
    super(`The fields ${field} and ${compareField} are not equals`);
    this.name = 'CompareFieldsError';
  }
}
