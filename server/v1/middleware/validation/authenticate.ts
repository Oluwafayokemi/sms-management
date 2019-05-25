
/**
 * @file isUserLoggedIn
 */
import { verifyToken } from "../../util";
import { NextFunction, Request, Response } from "express";

/**
  * This middleware intercepts the request and checks that the request
  * contains and x-access-token in the header.
  * The token must be valid for the request to proceed beyond here.
  * This middleware expects the token to contain a user object.
  * @param {object} req the request object
  * @param {object} res the response object
  * @param {object} next the next middleware function
  * @returns {user} the user object
  */
const authenticate = async (req?: Request, res?: Response, next?: NextFunction) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'You must be logged in to perform this operation',
    });
  }
  const decoded = await verifyToken(token);
  if (decoded) {
    const { user } = decoded;
    req.body.token = user
    return next();
  }
  return res.status(401).json({
    status: 'error',
    message: 'Your access token is invalid or expired. Please login again',
  });
};
export default authenticate;
