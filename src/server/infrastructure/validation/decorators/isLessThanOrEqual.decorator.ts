import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsLessThanOrEqual(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsLessThanOrEqual',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          if (isNaN(Number(value)) || isNaN(Number(value))) return true;
          return (
            typeof value === 'number' &&
            typeof relatedValue === 'number' &&
            value <= relatedValue
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be less than or equal to ${args.constraints[0]}`;
        },
      },
    });
  };
}
