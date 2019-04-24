/**
 * @file userController
 */

//  Modules
import { NextFunction, Request, Response } from 'express';
// Respository
import { UserRepository } from '../repository/UserRepository';
import { pool } from '../models';

export class UserController {
  private repo = new UserRepository(pool);
  async save(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(201);
      return this.repo.save(request.body);
    } catch (err) {
      throw `Could not create User (${err})`;
    }
  }
}

