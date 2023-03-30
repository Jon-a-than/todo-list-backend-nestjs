import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'

export function IsEqual(
  property: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsEqual',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions ?? {
        message: '参数不一致',
      },
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          return value === args.object[property]
        },
      },
    })
  }
}
