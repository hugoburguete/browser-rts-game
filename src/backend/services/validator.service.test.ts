import { validate } from "./validator.service";

describe('auth', () => {
  it('check for strings', () => {
    const validationObject = validate('string', 'Username').isString();
    const validationObject2 = validate('', 'Username').isString();
    const validationObject3 = validate('123', 'Username').isString();
    const validationObject4 = validate('@#$%^&`~', 'Username').isString();
    const validationObject5 = validate(123, 'Username').isString();

    expect(validationObject.valid).toBe(true);
    expect(validationObject.errorMessage).toBeFalsy();
    expect(validationObject2.valid).toBe(true);
    expect(validationObject2.errorMessage).toBeFalsy();
    expect(validationObject3.valid).toBe(true);
    expect(validationObject3.errorMessage).toBeFalsy();
    expect(validationObject4.valid).toBe(true);
    expect(validationObject4.errorMessage).toBeFalsy();
    expect(validationObject5.valid).toBe(false);
    expect(validationObject5.errorMessage).toBeTruthy();
  });

  it('check for valid emails', () => {
    const validationObject = validate('test@mailbox.com', 'Email').isValidEmailAddress();
    const validationObject2 = validate('', 'Email').isValidEmailAddress();
    const validationObject3 = validate('@#$%^&`~', 'Email').isValidEmailAddress();
    const validationObject4 = validate(123, 'Email').isValidEmailAddress();
    const validationObject5 = validate(false, 'Email').isValidEmailAddress();

    expect(validationObject.valid).toBe(true);
    expect(validationObject.errorMessage).toBeFalsy();
    expect(validationObject2.valid).toBe(false);
    expect(validationObject2.errorMessage).toBeTruthy();
    expect(validationObject3.valid).toBe(false);
    expect(validationObject3.errorMessage).toBeTruthy();
    expect(validationObject4.valid).toBe(false);
    expect(validationObject4.errorMessage).toBeTruthy();
    expect(validationObject5.valid).toBe(false);
    expect(validationObject5.errorMessage).toBeTruthy();
  });

  it('check for alphanumberic values', () => {
    const validationObject = validate('abc123', 'Alphanumeric').isAlphaNumeric();
    const validationObject2 = validate(123, 'Alphanumeric').isAlphaNumeric();
    const validationObject3 = validate('', 'Alphanumeric').isAlphaNumeric();
    const validationObject4 = validate('@#$%^&`~', 'Alphanumeric').isAlphaNumeric();
    const validationObject5 = validate('test@mailbox.com', 'Alphanumeric').isAlphaNumeric();

    expect(validationObject.valid).toBe(true);
    expect(validationObject.errorMessage).toBeFalsy();
    expect(validationObject2.valid).toBe(true);
    expect(validationObject2.errorMessage).toBeFalsy();
    expect(validationObject3.valid).toBe(false);
    expect(validationObject3.errorMessage).toBeTruthy();
    expect(validationObject4.valid).toBe(false);
    expect(validationObject4.errorMessage).toBeTruthy();
    expect(validationObject5.valid).toBe(false);
    expect(validationObject5.errorMessage).toBeTruthy();
  });
});