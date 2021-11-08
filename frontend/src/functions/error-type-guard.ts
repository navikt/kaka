import { Infer, array, number, object, string } from 'superstruct';

const ValidationError = object({
  reason: string(),
  field: string(),
});

export type IValidationError = Infer<typeof ValidationError>;

const ValidationErrors = array(ValidationError);

export type IValidationErrors = Infer<typeof ValidationErrors>;

export const ApiValidationError = object({
  status: number(),
  data: object({
    status: number(),
    title: string(),
    'invalid-properties': ValidationErrors,
  }),
});
