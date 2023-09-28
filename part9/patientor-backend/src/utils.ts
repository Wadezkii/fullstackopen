import { NewPatientEntry, Gender } from './types/index';
import Joi from 'joi';

const toNewPatientEntry = (object: any): NewPatientEntry => {
  const schema = Joi.object({
    name: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    ssn: Joi.string().required(),
    gender: Joi.string().valid(...Object.values(Gender)).required(),
    occupation: Joi.string().required(),
    entries: Joi.array().items(Joi.any()).optional()
  });

  const { value, error } = schema.validate(object);
  if (error) {
    throw new Error('Invalid input: ' + error.details[0].message);
  }

  return value as NewPatientEntry;
}

export { toNewPatientEntry };
