import logger from './winston';
import { User } from './repository/UserRepository';
import { Request, Response } from 'express';
const bcrypt = require('bcrypt');

export interface iError {
  friendlyErrorMessage: string;
  errors: any;
}

/* 
  Handles sending custom errors to the user
    response: The HTTP response object
    statusCode: The status code of the error e.g 400
    error: The error object which contains friendlyErrorMessage and errors
*/
export const sendCustomError = (
  response: Response,
  statusCode: number,
  error: iError,
) => {
  logger.error(error);
  return response.status(statusCode).send({ ...error });
};

/**
 * @function encryptPassword
 */
export const encryptPassword = (password = '') => {
  const saltRounds = 10;
  const encryptedPassword = bcrypt.hashSync(password, saltRounds)
  return encryptedPassword;
}

/**
 * @function comparePassword
 */
export const comparePassword = (password: string, hash: string) => {
  const isValidPassword = bcrypt.compareSync(password.trim(), hash)
  return isValidPassword;
}