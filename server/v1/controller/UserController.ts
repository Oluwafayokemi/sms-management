/**
 * @file userController
 */

//  Modules
import { NextFunction, Request, Response } from 'express';
// Respository
import { UserRepository, User } from '../repository/UserRepository';
import { pool } from '../models';
import UserValidator from '../middleware/validation/signUpValidator';
import validateRequest from '../middleware/validation';
import { sendCustomError } from '../util';
import LoginValidator from '../middleware/validation/loginValidator';

export class UserController {
  private repo = new UserRepository(pool);
  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const newUser = new User(request.body);
      const errors = await validateRequest(UserValidator, newUser);
      if (!errors) {
        response.status(201);
        return this.repo.save({ ...request.body, response, request });
      }
      return sendCustomError(response, 400, errors)
    } catch (err) {
      throw `could not create user (${err})`
    }
  }

  async getOne(request: Request, response: Response, next: NextFunction) {
    try {
      const newUser = new User(request.body);
      const errors = await validateRequest(LoginValidator, newUser);
      if (!errors) {
        response.status(200)
        return this.repo.getOne({ ...request.body, response, request });
      }
      return sendCustomError(response, 400, errors)
    } catch (err) {
      throw `Could not get User (${err})`;
    }
  }
}

