import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

function isValidHttpUrl(urlString) {
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (error) {
    return false;
  }
}
@ValidatorConstraint({ name: 'isArrayOrString', async: false })
export class IsArrayOrString implements ValidatorConstraintInterface {
  validate(value: any): boolean | Promise<boolean> {
    return (
      (Array.isArray(value) &&
        value.every((item) => typeof item === 'string')) ||
      typeof value === 'string'
    );
  }
}

@ValidatorConstraint({ name: 'isArrayOrStringOfUrls', async: false })
export class IsArrayOrStringOfUrls implements ValidatorConstraintInterface {
  validate(value: any): boolean | Promise<boolean> {
    return (
      (Array.isArray(value) && value.every(isValidHttpUrl)) ||
      isValidHttpUrl(value)
    );
  }
}
