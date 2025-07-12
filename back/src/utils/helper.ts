import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const jwtGetToken = (id: string, expiresIn: string = '1h') => {
  // 'expiresIn' specifies the time from now in seconds or a string describing a time span, like "1d" (1 day)
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn });
  return token;
};

/**
 * Creates a BadRequestException with formatted validation errors.
 * @param validationErrors Array of validation errors provided by class-validator.
 * @returns An instance of BadRequestException with formatted errors.
 */
export const validationPipeExceptionFactory = (
  validationErrors: ValidationError[] = [],
) => {
  return new BadRequestException(
    validationErrors.map((error) => ({
      field: error.property,
      error: Object.values(error.constraints).join(', '),
    })),
  );
};


export const generatePassword = async (password: string) => {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
