type MinimumSizeErrorParams = {
  name: string;
  size: number;
};

export class MinimumSizeError extends Error {
  constructor({ name, size }: MinimumSizeErrorParams) {
    super(`The ${name} must be at least ${size} characters long`);
    this.name = 'MinimumSizeError';
  }
}
