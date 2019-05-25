/**
 * @file Message Controller
 */

import { NextFunction, Request, Response } from 'express';
import { MessageRepository, Message } from '../repository/MessageRepository';
import { pool } from '../models';
import { sendCustomError } from '../util';
import validateRequest from '../middleware/validation';
import MessageValidator from '../middleware/validation/messageValidator';
import authenticate from '../middleware/validation/authenticate';

export class MessageController {
  private repo = new MessageRepository(pool);
  async save(request, response: Response, next: NextFunction) {
    try {
      const newMessage = new Message(request.body);
      const errors = await validateRequest(MessageValidator, newMessage);
      if (!errors) {
        response.status(201); // created
        const message = await this.repo.save(request.body, response);
        return message;
      }
      sendCustomError(response, 400, errors);
    } catch (err) {
      throw `could not create message (${err})`
    }
  }

  async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(200);
      return this.repo.getAll({ ...request.params, response, request });
    } catch (err) {
      throw `Could not get User (${err})`;
    }
  }
  async getOne(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(200);
      return this.repo.getOne({ ...request.params, response, request });
    } catch (err) {
      throw `Could not get User (${err})`;
    }
  }
  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(204);
      return this.repo.delete({ ...request.params, response, request });
    } catch (err) {
      throw `Could not get User (${err})`;
    }
  }

}