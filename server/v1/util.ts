import logger from './winston';
import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
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

/**
 * @function createToken
 * @description This method takes a payload and a duration for which the token is expected to be valid and signs a jwt token.
 * @param {object} payload contains the user information to be signed into the token
 * @param {number} expiresIn the validity period of the token
 * @returns {string} the signed jwt token
 */
export const createToken = (payload) => {
  return jwt.sign(payload, 'secret',
    { expiresIn: '1d' },
  )
}

/**
 * @function verifyToken
 * @description This method takes a token and returns the decoded payload.
 * @param {object} token the jwt token
 * @return {object} the decoded token payload
 */
export const verifyToken = (token) => {
  return jwt.verify(token, 'secret', (err, decoded) => {
    if (decoded) {
      return decoded;
    }
    return err.message;
  });
}
