class ValidationObject {
  label: string = '';
  value: any = '';
  valid: boolean = true;
  errorMessage: string = '';

  constructor(value: any, label: string) {
    this.value = value;
    this.label = label;
  }

  isString(): ValidationObject {
    this.valid = typeof this.value === 'string' || this.value instanceof String;
    if (!this.valid) { this.errorMessage = `Field "${this.label}" is not a string.`; }

    return this;
  }

  isValidEmailAddress() {
    if (!this.valid) return this;

    var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    this.valid = re.test(this.value);
    if (!this.valid) { this.errorMessage = `Field "${this.label}" is not a valid email address.` }

    return this;
  }

  isAlphaNumeric() {
    if (!this.valid) return this;

    var re = /^[a-z0-9]+$/i;
    this.valid = re.test(this.value);
    if (!this.valid) { this.errorMessage = `Field "${this.label}" can only be an alphanumeric value.` }
    return this;
  }

  isBetweenLength(min: number, max: number) {
    if (!this.valid) return this;

    let self = this.isLongerThan(min);
    self = self.isShorterThan(max);
    return self;
  }

  isLongerThan(min: number) {
    if (!this.valid) return this;

    this.valid = this.value.length > min;
    if (!this.valid) { this.errorMessage = `Field "${this.label}" must be longer than ${min} characters.`; }

    return this;
  }

  isShorterThan(max: number) {
    if (!this.valid) return this;

    this.valid = this.value.length < max;
    if (!this.valid) { this.errorMessage = `Field "${this.label}" must be shorter than ${max} characters.`; }

    return this;
  }
}

export class ErrorBag {
  errors: string[] = [];

  constructor(validationObjects: ValidationObject[] | ValidationObject) {
    if (validationObjects instanceof ValidationObject) {
      validationObjects = [validationObjects];
    }

    for (let i = 0; i < validationObjects.length; i++) {
      const validationObject = validationObjects[i];
      if (!validationObject.valid) {
        this.errors.push(validationObject.errorMessage);
      }
    }
  }

  hasErrors() {
    return this.errors.length > 0;
  }
}

export const validate = (value: any, label: string) => {
  return new ValidationObject(value, label);
}

export const hasErrors = (validationObjects: ValidationObject[]): boolean => {
  return (new ErrorBag(validationObjects)).hasErrors();
}