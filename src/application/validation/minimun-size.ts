import { MinimumSizeError } from '@/application/errors';
import { Field, Validator } from '@/application/validation';

export class MinimumSizeValidator implements Validator {
  constructor(private readonly text: Field, private readonly min: number) {}

  validate(): Error | undefined {
    if (this.text.value.length < this.min) {
      return new MinimumSizeError({ name: this.text.name, size: this.min });
    }

    return undefined;
  }
}
